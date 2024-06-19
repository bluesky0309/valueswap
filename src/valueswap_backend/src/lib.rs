use candid::CandidType;
use ic_cdk_macros::{init, query, update};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

use ic_cdk::export_candid;

#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
struct PoolShare {
    token_a: f64,
    token_b: f64,
    mv_token_a: f64,
    mv_token_b: f64,
}

impl PoolShare {
    fn new() -> PoolShare {
        PoolShare {
            token_a: 100.0,
            token_b: 20.0,
            mv_token_a: 10.0,
            mv_token_b: 50.0,
        }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
enum TokenType {
    TokenA,
    TokenB,
}

#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
struct UserShare {
    token_a: f64,
    token_b: f64,
}

thread_local! {
    static POOL_SHARE: RefCell<PoolShare> = RefCell::new(PoolShare::new());
    static USER_SHARES: RefCell<HashMap<String, UserShare>> = RefCell::new(HashMap::new());
    static K: RefCell<f64> = RefCell::new(0.0);
    static TOTAL_VALUE : RefCell<f64> = RefCell::new(0.0);
}

#[init]
fn init() {
    POOL_SHARE.with(|pool| {
        *pool.borrow_mut() = PoolShare::new();
    });
    USER_SHARES.with(|user_shares| {
        *user_shares.borrow_mut() = HashMap::new();
    });
}

#[query]
fn get_tokens() -> PoolShare {
    POOL_SHARE.with(|pool| pool.borrow().clone())
}

#[update]
fn create_pool(pool_s: PoolShare) {
    let temp = pool_s.token_a * pool_s.token_b;
    let temp1 = pool_s.token_a + pool_s.token_b;
    K.with(|k| {
        *k.borrow_mut() = temp;
    });

    TOTAL_VALUE.with(|total_value| {
        *total_value.borrow_mut() = temp1;
    });
}

#[update]
fn share_calculation() -> f64 {
    let total_value = TOTAL_VALUE.with(|total_value| *total_value.borrow());
    let k = K.with(|k| *k.borrow());
    let total_shares: f64 = (k as f64).sqrt() as f64;
    let price_of_single_share: f64 = total_value / total_shares;
    total_shares
}

#[update]
fn swap(token_type: TokenType, amount: f64) -> Option<PoolShare> {
    let updated_pool = POOL_SHARE.with(|pool| {
        let mut pool_data = pool.borrow_mut();
        let total_value_token_a = pool_data.token_a * pool_data.mv_token_a;
        let total_value_token_b = pool_data.token_b * pool_data.mv_token_b;
        match token_type {
            TokenType::TokenA => {
                let dx = amount;
                let dy = (pool_data.token_b * dx) / (pool_data.token_a + dx);

                // Update token quantities in the pool
                pool_data.token_a += dx;
                pool_data.token_b -= dy;

                pool_data.mv_token_a = total_value_token_a / pool_data.token_a;
                pool_data.mv_token_b = total_value_token_b / pool_data.token_b;

                // Calculate the liquidity provider fee
                let lp_fee = 0.1 * dy / 100.0;
                pool_data.token_b -= lp_fee;
            }
            TokenType::TokenB => {
                let dy = amount;
                let dx = (pool_data.token_a * dy) / (pool_data.token_b + dy);

                // Update token quantities in the pool
                pool_data.token_b += dy;
                pool_data.token_a -= dx;

                pool_data.mv_token_a = total_value_token_a / pool_data.token_a;
                pool_data.mv_token_b = total_value_token_b / pool_data.token_b;

                // Calculate the liquidity provider fee
                let lp_fee = 0.1 * dx / 100.0;
                pool_data.token_a -= lp_fee;
            }
        }
        pool_data.clone()
    });

    Some(updated_pool)
}

#[update]
fn add_liquidity(user: String, new_token_a: f64, new_token_b: f64) -> Option<PoolShare> {
    POOL_SHARE.with(|pool| {
        let mut pool_data = pool.borrow_mut();
        
        // Update pool with new liquidity
        pool_data.token_a += new_token_a;
        pool_data.token_b += new_token_b;

        // Recalculate the marginal values
        let total_value_token_a = pool_data.token_a * pool_data.mv_token_a;
        let total_value_token_b = pool_data.token_b * pool_data.mv_token_b;

        pool_data.mv_token_a = total_value_token_a / pool_data.token_a;
        pool_data.mv_token_b = total_value_token_b / pool_data.token_b;

        // Calculate the constant product
        let new_k = pool_data.token_a * pool_data.token_b;

        // Update K
        K.with(|k| {
            *k.borrow_mut() = new_k;
        });

        // Update total value
        let total_value = pool_data.token_a + pool_data.token_b;
        TOTAL_VALUE.with(|total_value_ref| {
            *total_value_ref.borrow_mut() = total_value;
        });

        // Update user shares
        USER_SHARES.with(|user_shares| {
            let mut user_shares_data = user_shares.borrow_mut();
            let entry = user_shares_data.entry(user).or_insert(UserShare {
                token_a: 0.0,
                token_b: 0.0,
            });
            entry.token_a += new_token_a;
            entry.token_b += new_token_b;
        });

        Some(pool_data.clone())
    })
}

#[query]
fn get_user_shares(user: String) -> Option<UserShare> {
    USER_SHARES.with(|user_shares| {
        user_shares.borrow().get(&user).cloned()
    })
}

#[update]
fn remove_liquidity(user: String, burn_percent: f64) {
    let total_shares = share_calculation();
    USER_SHARES.with(|user_shares| {
        if let Some(user_share) = user_shares.borrow_mut().get_mut(&user) {
            let shares_burnt = (total_shares * burn_percent * burn_percent);
            let token_a_burnt = user_share.token_a * (burn_percent / total_shares);
            let token_b_burnt = user_share.token_b * (burn_percent / total_shares);

            POOL_SHARE.with(|pool| {
                let mut pool_data = pool.borrow_mut();
                pool_data.token_a -= token_a_burnt;
                pool_data.token_b -= token_b_burnt;
            });

            user_share.token_a -= token_a_burnt;
            user_share.token_b -= token_b_burnt;
        }
    });
}

export_candid!();
