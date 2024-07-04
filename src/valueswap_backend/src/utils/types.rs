use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub struct PoolShare {
    pub token_balances: [f64; 8], // Supports up to 8 tokens
    pub token_weights: [f64; 8],  // Weights of the tokens
}

impl PoolShare {
    pub fn new(balances: [f64; 8], weights: [f64; 8]) -> Self {
        PoolShare {
            token_balances: balances,
            token_weights: weights,
        }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub struct UserShare {
    pub token_balances: [f64; 8], // User's balances of the 8 tokens
}

impl UserShare {
    pub fn new() -> Self {
        UserShare {
            token_balances: [0.0; 8],
        }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub enum TokenType {
    TokenA,
    TokenB,
}
