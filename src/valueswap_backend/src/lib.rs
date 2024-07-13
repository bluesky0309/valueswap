use candid::{CandidType, Deserialize};
use ic_cdk_macros::{init, query, update};
use serde::Serialize;
use std::cell::RefCell;
use std::collections::{btree_map, HashMap};
use std::hash::Hash;

use ic_cdk::export_candid;

mod utils;

// Re-export the structs and functions from utils
pub use utils::types::{PoolShare, UserShare, TokenType};
pub use utils::maths::*;  // Re-export the mathematical functions
pub use utils::constants::*;

// Define the input struct for create_pool
#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct CreatePoolParams {
    token_names: Vec<String>,   // Names of the tokens
    balances: Vec<f64>,         // Token balances
    weights: Vec<f64>,          // Token weights
}

// Thread-local storage for pool state
thread_local! {
    // Pool token balances, weights, and names
    static POOL_SHARE: RefCell<PoolShare> = RefCell::new(PoolShare::new(
        vec!["TokenA".to_string(), "TokenB".to_string()], // Default token names
        vec![100.0, 200.0],                              // Default token balances
        vec![50.0, 50.0]                                   // Default token weights
    ));
    
    // User shares in the pool
    static USER_SHARES: RefCell<HashMap<String, UserShare>> = RefCell::new(HashMap::new());
    // Pools in the vault
    static VAULT : RefCell<HashMap<String , PoolShare>> = RefCell::new(HashMap::new());
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
            vec![100.0, 200.0],                              // Default token balances
            vec![50.0, 50.0]                                   // Default token weights
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
fn get_tokens() -> PoolShare {
    POOL_SHARE.with(|pool| pool.borrow().clone())
}

// Query to get the constant product value
#[query]
fn get_constant_product_value() -> f64 {
    POOL_SHARE.with(|pool| {
        let pool_data = pool.borrow();
        constant_product(&pool_data.token_balances, &pool_data.token_weights)
    })
}


#[update]
fn create_pool(params: CreatePoolParams) {
    // Check if lengths match
    if params.token_names.len() != params.balances.len() || params.balances.len() != params.weights.len() {
        return ic_cdk::println!("Error: Length of token names, balances, and weights must be the same.");
        // return;
    }

    // Check if sum of weights equals 100
    let total_weight: f64 = params.weights.iter().sum();
    if (total_weight - 100.0).abs() > f64::EPSILON {
        return ic_cdk::println!("Error: Sum of weights must be 100.");
        // return;
    }

    // Proceed with pool creation
    POOL_SHARE.with(|pool| {
        *pool.borrow_mut() = PoolShare::new(params.token_names, params.balances, params.weights);
    });
}

// Export Candid interface
export_candid!();
