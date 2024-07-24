use ic_cdk_macros::{update,query};
use std::collections::HashMap;
use std::cell::RefCell;
use candid::{CandidType, Deserialize, Nat, Principal};
use ic_cdk::call;
use ic_cdk::api;

use crate::utils::types::*;

thread_local! {
    pub static TOKEN_POOLS: RefCell<HashMap<String, Principal>> = RefCell::new(HashMap::new());
}

#[query]
fn prevent_anonymous() -> Result<(), String> {
    if api::caller() == Principal::anonymous() {
        Err("Anonymous access not allowed".to_string())
    } else {
        Ok(())
    }
}

#[update(guard = prevent_anonymous)]
async fn create_pools(params: CreatePoolParams) -> Result<(), String> {
    let principal_id = api::caller();
    if principal_id == Principal::anonymous() {
        return Err("Anonymous principal not allowed to make calls".to_string());
    }

    let pool_name = params.token_names.join("");

    let pool_canister_id = TOKEN_POOLS.with(|pool| {
        let mut pool_borrowed = pool.borrow_mut();
        if let Some(canister_id) = pool_borrowed.get(&pool_name) {
            // Pool exists, return the canister ID
            return Some(*canister_id);
        } else {
            // Pool does not exist, create a new canister
            None
        }
    });

    if let Some(canister_id) = pool_canister_id {
        // Placeholder code for adding tokens to existing pool
        Ok(())
    } else {
        // Create a new canister
        match create_new_pool_canister(pool_name.clone()).await {
            Ok(canister_id) => {
                TOKEN_POOLS.with(|pool| {
                    pool.borrow_mut().insert(pool_name, canister_id);
                });
                Ok(())
            },
            Err(e) => Err(e),
        }
    }
}

#[update]
async fn create_new_pool_canister(pool_name: String) -> Result<Principal, String> {
    // Define the canister creation arguments
    let settings = CanisterSettings {
        controllers: None,
        compute_allocation: None,
        memory_allocation: None,
        freezing_threshold: None,
        reserved_cycles_limit: None,
        wasm_memory_limit: None,
    };

    let args = CreateCanisterArgument {
        settings: Some(settings),
    };

    // Call the management canister to create a new canister
    let (canister_id_record,): (CanisterIdRecord,) = call(
        Principal::management_canister(),
        "create_canister",
        (args, 0_u128),
    )
    .await
    .map_err(|e| e.1)?;

    Ok(canister_id_record.canister_id.0)
}

pub async fn transfer_from_ckbtc(
    ledger_canister_id: Principal,
    from: Principal,
    to: Principal,
    amount: Nat,
) -> Result<Nat, String> {
    let args = TransferFromArgs {
        to: TransferAccount {
            owner: to,
            subaccount: None,
        },
        fee: None,
        spender_subaccount: None,
        from: TransferAccount {
            owner: from,
            subaccount: None,
        },
        memo: None,
        created_at_time: None,
        amount,
    };
    let (result,): (TransferFromResult,) = call(ledger_canister_id, "icrc2_transfer_from", (args,))
        .await
        .map_err(|e| e.1)?;

    match result {
        TransferFromResult::Ok(balance) => Ok(balance),
        TransferFromResult::Err(err) => Err(format!("{:?}", err)),
    }
}

pub async fn transfer_from_cketh(
    ledger_canister_id: Principal,
    from: Principal,
    to: Principal,
    amount: Nat,
) -> Result<Nat, String> {
    let args = TransferFromArgs {
        to: TransferAccount {
            owner: to,
            subaccount: None,
        },
        fee: None,
        spender_subaccount: None,
        from: TransferAccount {
            owner: from,
            subaccount: None,
        },
        memo: None,
        created_at_time: None,
        amount,
    };
    let (result,): (TransferFromResult,) = call(ledger_canister_id, "icrc2_transfer_from", (args,))
        .await
        .map_err(|e| e.1)?;

    match result {
        TransferFromResult::Ok(balance) => Ok(balance),
        TransferFromResult::Err(err) => Err(format!("{:?}", err)),
    }
}

#[derive(CandidType, Deserialize)]
pub struct CreateCanisterArgument {
    pub settings: Option<CanisterSettings>,
}

#[derive(CandidType, Deserialize)]
pub struct CanisterIdRecord {
    pub canister_id: CanisterId,
}

#[derive(CandidType, Deserialize)]
pub struct CanisterId(pub Principal);

#[derive(CandidType, Deserialize)]
pub struct CanisterSettings {
    pub controllers: Option<Vec<Principal>>,
    pub compute_allocation: Option<Nat>,
    pub memory_allocation: Option<Nat>,
    pub freezing_threshold: Option<Nat>,
    pub reserved_cycles_limit: Option<Nat>,
    pub wasm_memory_limit: Option<Nat>,
}
