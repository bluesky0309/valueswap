use ic_cdk_macros::query;
use std::cell::RefCell;
use std::collections::HashMap;

// use crate::utils::maths::*;
use crate::utils::types::*;
// use crate::vault::vault_pool::VAULT;

thread_local! {
    static TOTAL_LP_SUPPLY : RefCell<u64> = RefCell::new(0);
    static POOL_LP_SHARE : RefCell<HashMap<String , u64>> = RefCell::new(HashMap::new());
}

// To map pool with their LP tokens
#[query]
fn pool_lp_tokens(params: CreatePoolParams) -> HashMap<String, u64> {
    POOL_LP_SHARE.with(|lp_share| {
        let pool_supply: u64 = params
            .values
            .iter()
            .zip(params.balances.iter())
            .map(|(value, balance)| value * balance)    
            .sum();

        let key: String = params.token_names.join("");
        lp_share.borrow_mut().insert(key, pool_supply);
    });

    POOL_LP_SHARE.with(|lp_share| lp_share.borrow().clone())
}

// To get all lp tokens
#[query]
fn total_lp_tokens() -> u64 {
    let mut total_supply: u64 = 0;
    POOL_LP_SHARE.with(|share| {
        let temp: HashMap<String, u64> = share.borrow().clone();
        for (_key, value) in temp.iter() {
            total_supply += value
        }
    });

    TOTAL_LP_SUPPLY.with(|lp_supply| *lp_supply.borrow_mut() = total_supply);

    total_supply
}

// Query to get LP tokens for a specific pool
#[query]
fn get_lp_tokens(pool_name: String) -> Option<u64> {
    POOL_LP_SHARE.with(|share| {
        let temp: HashMap<String, u64> = share.borrow().clone();
        if let Some(key) = temp.get(&pool_name) {
            Some(*key)
        } else {
            None
        }
    })
}

// fn remove_liquidity(pool_name: String) {
    
// }
