use ic_cdk_macros::{init , query , update};
use std::cell::RefCell;
use std::collections::HashMap;

use crate::utils::maths::*;
use crate::utils::types::{PoolShare, UserShare , CreatePoolParams};

thread_local! {
    // Pool token balances, weights, and names
    static POOL_SHARE: RefCell<PoolShare> = RefCell::new(PoolShare::new(
        vec!["TokenA".to_string(), "TokenB".to_string()], // Default token names
        vec![100.0, 200.0],                               // Default token balances
        vec![50.0, 50.0],                                 // Default token weights
        vec![1.0 , 2.0]
    ));
    
    // User shares in the pool
    static USER_SHARES: RefCell<HashMap<String, UserShare>> = RefCell::new(HashMap::new());
    // Pools in the vault
    pub static VAULT : RefCell<HashMap<String , PoolShare>> = RefCell::new(HashMap::new());
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
        *pool.borrow_mut() = PoolShare::new(
            vec!["TokenA".to_string(), "TokenB".to_string()], // Default token names
            vec![100.0, 200.0],                               // Default token balances
            vec![50.0, 50.0],                                 // Default token weights
            vec![1.0 , 2.0]
        ); 
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
fn get_tokens() -> HashMap<String, PoolShare> {
    VAULT.with(|pool| pool.borrow().clone())
}

// Query to get the constant product value
#[query]
fn get_constant_product_value() -> f64 {
    VAULT.with(|vault| {
        let mut total_product = 1.0;
        for pool in vault.borrow().values() {
            total_product += constant_product(&pool.token_balances, &pool.token_weights);
        }
        total_product
    })
}

#[update]
fn create_pool(params: CreatePoolParams) {
    // Check if lengths match
    if params.balances.len() != params.weights.len() || params.balances.len() != params.token_names.len() {
        return ic_cdk::println!("Error: Length of token names, balances, and weights must be the same.")
    }

    // Check if sum of weights equals 100
    let total_weight: f64 = params.weights.iter().sum();
    if (total_weight - 100.0).abs() > f64::EPSILON {
        return ic_cdk::println!("Error: Sum of weights must be 100.");
    }

    // Proceed with pool creation
    POOL_SHARE.with(|pool|{
        let new_pool = PoolShare::new(params.token_names.clone(), params.balances.clone(), params.weights.clone(), params.values);
        *pool.borrow_mut() = new_pool.clone();

     // Insert the new pool into VAULT
     VAULT.with(|vault| {
        let key = params.token_names.join("");
        vault.borrow_mut().insert(key, new_pool);
    });
});
}



