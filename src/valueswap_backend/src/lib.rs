use ic_cdk::export_candid;
use std::collections::HashMap;
use candid::{Principal, Nat};

mod utils;
mod vault;
mod logic;
mod api;
mod constants;

pub use utils::types::{PoolShare, UserShare,CreatePoolParams};

// Export Candid interface
export_candid!();
