use serde::{Deserialize, Serialize};
use candid::CandidType;

/// Represents the pool's share with token balances and weights.
#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub struct PoolShare {
    pub token_names: Vec<String>,    // Names of the tokens
    pub token_balances: Vec<f64>,    // Balances of the tokens
    pub token_weights: Vec<f64>,     // Weights of the tokens
}

impl PoolShare {
    /// Creates a new PoolShare instance with given names, balances, and weights.
    pub fn new(names: Vec<String>, balances: Vec<f64>, weights: Vec<f64>) -> Self {
        PoolShare {
            token_names: names,
            token_balances: balances,
            token_weights: weights,
        }
    }
}

/// Represents the user's share with their token balances.
#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub struct UserShare {
    pub token_balances: Vec<f64>, // User's balances of the tokens
}

impl UserShare {
    /// Creates a new UserShare instance with zero balances for the given number of tokens.
    pub fn new(num_tokens: usize) -> Self {
        UserShare {
            token_balances: vec![0.0; num_tokens],
        }
    }
}

// Implementing the Default trait for UserShare to provide a default initialization.
impl Default for UserShare {
    fn default() -> Self {
        UserShare::new(8) // Default to 8 tokens
    }
}

/// Enum representing different types of tokens.
#[derive(Debug, Clone, CandidType, Deserialize, Serialize)]
pub enum TokenType {
    TokenA,
    TokenB,
    // Add more token types as needed
}

impl TokenType {
    /// Returns the name of the token type as a string.
    pub fn name(&self) -> &str {
        match self {
            TokenType::TokenA => "TokenA",
            TokenType::TokenB => "TokenB",
            // Add more token names as needed
        }
    }
}
