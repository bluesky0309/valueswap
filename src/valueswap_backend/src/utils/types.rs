use serde::{Deserialize, Serialize};
use candid::CandidType;

/// Represents the pool's share with token balances and weights.
#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub struct PoolShare {
    pub token_balances: [f64; 8], // Supports up to 8 tokens
    pub token_weights: [f64; 8],  // Weights of the tokens
}

impl PoolShare {
    /// Creates a new PoolShare instance with given balances and weights.
    pub fn new(balances: [f64; 8], weights: [f64; 8]) -> Self {
        PoolShare {
            token_balances: balances,
            token_weights: weights,
        }
    }
}

/// Represents the user's share with their token balances.
#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub struct UserShare {
    pub token_balances: [f64; 8], // User's balances of the 8 tokens
}

impl UserShare {
    /// Creates a new UserShare instance with zero balances.
    pub fn new() -> Self {
        UserShare {
            token_balances: [0.0; 8],
        }
    }
}

// Implementing the Default trait for UserShare to provide a default initialization.
impl Default for UserShare {
    fn default() -> Self {
        UserShare::new()
    }
}

/// Enum representing different types of tokens.
#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub enum TokenType {
    TokenA,
    TokenB,
}

impl TokenType {
    /// Returns the name of the token type as a string.
    pub fn name(&self) -> &str {
        match self {
            TokenType::TokenA => "TokenA",
            TokenType::TokenB => "TokenB",
        }
    }
}
