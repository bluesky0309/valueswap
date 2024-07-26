// use serde::{Deserialize, Serialize};
use ic_cdk_macros::*;

#[query]
fn hello_world() -> String {
    "Hello, world!".to_string()
}

#[init]
fn init() {
    ic_cdk::println!("Swap canister initialized.");
}
