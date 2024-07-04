use candid::CandidType;
use ic_cdk_macros::{init, query, update};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

use ic_cdk::export_candid;

// Declare the utils module
pub mod utils;

// Re-export the structs and functions from utils
pub use utils::types::{PoolShare, UserShare, TokenType};
pub use utils::maths::*;  // Re-export the mathematical functions

// Thread-local storage for pool state
thread_local! {
    // Pool token balances and weights
    static POOL_SHARE: RefCell<PoolShare> = RefCell::new(PoolShare::new([100.0, 200.0, 300.0, 400.0, 500.0, 600.0, 700.0, 800.0], [0.125; 8]));
    // User shares in the pool
    static USER_SHARES: RefCell<HashMap<String, UserShare>> = RefCell::new(HashMap::new());
    // User LP tokens
    static LP_TOKENS: RefCell<HashMap<String, f64>> = RefCell::new(HashMap::new());
    // Total LP supply
    static TOTAL_LP_SUPPLY: RefCell<f64> = RefCell::new(0.0);
}

// Initialization function
#[init]
fn init() {
    // Initialize pool share
    POOL_SHARE.with(|pool| {
        *pool.borrow_mut() = PoolShare::new([100.0, 200.0, 300.0, 400.0, 500.0, 600.0, 700.0, 800.0], [0.125; 8]);
    });
    // Initialize user shares
    USER_SHARES.with(|user_shares| {
        *user_shares.borrow_mut() = HashMap::new();
    });
    // Initialize LP tokens
    LP_TOKENS.with(|lp_tokens| {
        *lp_tokens.borrow_mut() = HashMap::new();
    });
    // Initialize total LP supply
    TOTAL_LP_SUPPLY.with(|total_lp| {
        *total_lp.borrow_mut() = 0.0;
    });
}

// Query to get pool tokens
#[query]
fn get_tokens() -> PoolShare {
    POOL_SHARE.with(|pool| pool.borrow().clone())
}

// Update to create a new pool
#[update]
fn create_pool(balances: [f64; 8], weights: [f64; 8]) {
    POOL_SHARE.with(|pool| {
        *pool.borrow_mut() = PoolShare::new(balances, weights);
    });
}

// Add liquidity to the pool
#[update]
fn add_liquidity(user: String, new_balances: [f64; 8]) -> Option<PoolShare> {
    POOL_SHARE.with(|pool| {
        let mut pool_data = pool.borrow_mut();
        
        // Update pool with new liquidity
        for i in 0..8 {
            pool_data.token_balances[i] += new_balances[i];
        }

        // Calculate new constant product value
        let new_constant_product = constant_product(&pool_data.token_balances, &pool_data.token_weights);

        // Calculate LP tokens to be issued
        let lp_to_issue = new_constant_product * 2.0; // 2:1 ratio

        // Update total LP supply
        TOTAL_LP_SUPPLY.with(|total_lp| {
            *total_lp.borrow_mut() += lp_to_issue;
        });

        // Update user LP tokens
        LP_TOKENS.with(|lp_tokens| {
            let mut lp_tokens_data = lp_tokens.borrow_mut();
            *lp_tokens_data.entry(user.clone()).or_insert(0.0) += lp_to_issue;
        });

        // Update user shares
        USER_SHARES.with(|user_shares| {
            let mut user_shares_data = user_shares.borrow_mut();
            let entry = user_shares_data.entry(user).or_insert(UserShare {
                token_balances: [0.0; 8],
            });
            for i in 0..8 {
                entry.token_balances[i] += new_balances[i];
            }
        });

        Some(pool_data.clone())
    })
}

// Query to get user shares
#[query]
fn get_user_shares(user: String) -> Option<UserShare> {
    USER_SHARES.with(|user_shares| {
        user_shares.borrow().get(&user).cloned()
    })
}

// Query to get the constant product value
#[query]
fn get_constant_product_value() -> f64 {
    POOL_SHARE.with(|pool| {
        let pool_data = pool.borrow();
        constant_product(&pool_data.token_balances, &pool_data.token_weights)
    })
}

// Deposit all assets proportionally
#[update]
fn all_asset_deposit(user: String, issued: [f64; 8]) -> Option<PoolShare> {
    POOL_SHARE.with(|pool| {
        let mut pool_data = pool.borrow_mut();

        // Ensure all assets are deposited proportionally
        for i in 0..8 {
            pool_data.token_balances[i] += issued[i];
        }

        // Calculate new constant product value
        let new_constant_product = constant_product(&pool_data.token_balances, &pool_data.token_weights);

        // Calculate LP tokens to be issued
        let lp_to_issue = new_constant_product * 2.0; // 2:1 ratio

        // Update total LP supply
        TOTAL_LP_SUPPLY.with(|total_lp| {
            *total_lp.borrow_mut() += lp_to_issue;
        });

        // Update user LP tokens
        LP_TOKENS.with(|lp_tokens| {
            let mut lp_tokens_data = lp_tokens.borrow_mut();
            *lp_tokens_data.entry(user.clone()).or_insert(0.0) += lp_to_issue;
        });

        Some(pool_data.clone())
    })
}

// Deposit a single asset into the pool
#[update]
fn single_asset_deposit(user: String, amount: f64, asset_index: usize) -> Option<PoolShare> {
    POOL_SHARE.with(|pool| {
        let mut pool_data = pool.borrow_mut();

        // Ensure the asset index is within bounds
        if asset_index >= 8 {
            return None;
        }

        // Deposit the single asset
        pool_data.token_balances[asset_index] += amount;

        // Calculate new constant product value
        let new_constant_product = constant_product(&pool_data.token_balances, &pool_data.token_weights);

        // Calculate LP tokens to be issued
        let lp_to_issue = new_constant_product * 2.0; // 2:1 ratio

        // Update total LP supply
        TOTAL_LP_SUPPLY.with(|total_lp| {
            *total_lp.borrow_mut() += lp_to_issue;
        });

        // Update user LP tokens
        LP_TOKENS.with(|lp_tokens| {
            let mut lp_tokens_data = lp_tokens.borrow_mut();
            *lp_tokens_data.entry(user.clone()).or_insert(0.0) += lp_to_issue;
        });

        Some(pool_data.clone())
    })
}

// Query to get user LP tokens
#[query]
fn get_user_lp_tokens(user: String) -> Option<f64> {
    LP_TOKENS.with(|lp_tokens| {
        lp_tokens.borrow().get(&user).cloned()
    })
}

// Export Candid interface
export_candid!();
