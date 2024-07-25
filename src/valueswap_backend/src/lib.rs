use ic_cdk::export_candid;
use std::collections::HashMap;
use candid::Principal;

mod utils;
mod vault;

pub use utils::types::{PoolShare, UserShare, TokenType,CreatePoolParams};

// Export Candid interface
export_candid!();
