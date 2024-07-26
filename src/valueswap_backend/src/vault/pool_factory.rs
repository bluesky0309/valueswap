use ic_cdk_macros::{update, query};
use std::collections::HashMap;
use std::cell::RefCell;
use candid::{CandidType, Nat, Principal};
use serde::{Deserialize, Serialize};
use ic_cdk::{
    api::{
        call::{call_with_payment128, CallResult},
        canister_version,
        management_canister::main::{CanisterInstallMode, WasmModule},
    },
    call, api,
};

use crate::utils::types::*;
use crate::logic::deposit::*;
use crate::api::transfer::*;
use crate::api::deposit::deposit_ckbtc;

thread_local! {
    pub static TOKEN_POOLS: RefCell<HashMap<String, Principal>> = RefCell::new(HashMap::new());
}

// #[query]
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
            return Some(*canister_id);
        } else {
            None
        }
    });

    if let Some(canister_id) = pool_canister_id {
        deposit_ckbtc(2000).await?;
        Ok(())
    } else {
        match create_canister(CreateCanisterArgument {settings: None}).await {
            Ok((canister_id_record,)) => {
                let canister_id = canister_id_record.canister_id;
                TOKEN_POOLS.with(|pool| {
                    pool.borrow_mut().insert(pool_name, canister_id);
                });
                deposit_ckbtc(2000).await?;
                Ok(())
            },
            Err((_, err_string)) => Err(format!("Error creating canister: {}", err_string)),
        }
    }
}

#[derive(
    CandidType, Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone, Default,
)]
pub struct CanisterSettings {
    pub controllers: Option<Vec<Principal>>,

    pub compute_allocation: Option<Nat>,

    pub memory_allocation: Option<Nat>,

    pub freezing_threshold: Option<Nat>,

    pub reserved_cycles_limit: Option<Nat>,
}

#[derive(
    CandidType, Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone,
)]
pub(crate) struct InstallCodeArgumentExtended {
    pub mode: CanisterInstallMode,
    pub canister_id: CanisterId,
    pub wasm_module: WasmModule,
    pub arg: Vec<u8>,
    pub sender_canister_version: Option<u64>,
}

#[derive(
    CandidType, Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone, Default,
)]
pub struct CreateCanisterArgument {
    pub settings: Option<CanisterSettings>,
}

#[derive(
    CandidType, Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone,
)]
pub struct InstallCodeArgument {
    pub mode: CanisterInstallMode,
    pub canister_id: CanisterId,
    pub wasm_module: WasmModule,
    pub arg: Vec<u8>,
}

pub type CanisterId = Principal;

#[derive(
    CandidType, Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone, Copy,
)]
pub struct CanisterIdRecord {
    pub canister_id: CanisterId,
}

#[derive(
    CandidType, Serialize, Deserialize, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone, Default,
)]
pub(crate) struct CreateCanisterArgumentExtended {
    pub settings: Option<CanisterSettings>,
    pub sender_canister_version: Option<u64>,
}

// Create canister
async fn create_canister(
    arg: CreateCanisterArgument,
) -> CallResult<(CanisterIdRecord,)> {
    let extended_arg = CreateCanisterArgumentExtended {
        settings: arg.settings,
        sender_canister_version: Some(canister_version()),
    };
    let cycles: u128 = 100_000_000_000;

    call_with_payment128(
        Principal::management_canister(),
        "create_canister",
        (extended_arg,),
        cycles,
    )
    .await
}

async fn deposit_cycles(arg: CanisterIdRecord, cycles: u128) -> CallResult<()> {
    call_with_payment128(
        Principal::management_canister(),
        "deposit_cycles",
        (arg,),
        cycles,
    )
    .await
}

async fn install_code(arg: InstallCodeArgument) -> CallResult<()> {
    let wasm_module_sample: Vec<u8> =
        include_bytes!("/Users/admin/Desktop/qb/valueswap/.dfx/local/canisters/swap/swap.wasm").to_vec();

    let extended_arg = InstallCodeArgumentExtended {
        mode: arg.mode,
        canister_id: arg.canister_id,
        wasm_module: wasm_module_sample,
        arg: arg.arg,
        sender_canister_version: Some(canister_version()),
    };

    call_with_payment128(
        Principal::management_canister(),
        "install_code",
        (extended_arg,),
        0,
    )
    .await
}

#[update]
pub async fn create() -> Result<String, String> {
    let arg = CreateCanisterArgument { settings: None };
    let (canister_id_record,) = match create_canister(arg).await {
        Ok(id) => id,
        Err((_, err_string)) => {
            ic_cdk::println!("Error in creating canister: {}", err_string);
            return Err(format!("Error: {}", err_string));
        }
    };

    let canister_id = canister_id_record.canister_id;

    let _add_cycles: Result<(), String> = match deposit_cycles(canister_id_record, 100_000_000).await {
        Ok(_) => Ok(()),
        Err((_, err_string)) => {
            ic_cdk::println!("Error in depositing cycles: {}", err_string);
            return Err(format!("Error: {}", err_string));
        }
    };

    let arg1 = InstallCodeArgument {
        mode: CanisterInstallMode::Install,
        canister_id,
        wasm_module: vec![],  // Placeholder, should be the actual WASM module bytes if needed
        arg: Vec::new(),
    };

    let _install_code: Result<(), String> = match install_code(arg1).await {
        Ok(_) => Ok(()),
        Err((_, err_string)) => {
            ic_cdk::println!("Error in installing code: {}", err_string);
            return Err(format!("Error: {}", err_string));
        }
    };

    ic_cdk::println!("Canister ID: {:?}", canister_id.to_string());
    Ok(format!("Canister ID: {}", canister_id.to_string()))
}
