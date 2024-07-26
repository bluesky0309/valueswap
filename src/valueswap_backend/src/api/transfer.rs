// use crate::utils::types::*;
// use candid::{Nat, Principal};
// use ic_cdk::call;
// use crate::utils::types::*;
// // #[query]
// // fn new_id() -> Principal {
// //     id()
// // }

// // #[query]
// // fn other_id() -> Principal {
// //      Principal::from_text("b77ix-eeaaa-aaaaa-qaada-cai").expect("Invalid ledger canister ID")
// // }

// pub async fn transfer_from_ckbtc(
//     ledger_canister_id: Principal,
//     from: Principal,
//     to: Principal,
//     amount: Nat,
// ) -> Result<Nat, String> {
//     let args = TransferFromArgs {
//         to: TransferAccount {
//             owner: to,
//             subaccount: None,
//         },
//         fee: None,
//         spender_subaccount: None,
//         from: TransferAccount {
//             owner: from,
//             subaccount: None,
//         },
//         memo: None,
//         created_at_time: None,
//         amount,
//     };
//     let (result,): (TransferFromResult,) = call(ledger_canister_id, "icrc2_transfer_from", (args,))
//         .await
//         .map_err(|e| e.1)?;

//     match result {
//         TransferFromResult::Ok(balance) => Ok(balance),
//         TransferFromResult::Err(err) => Err(format!("{:?}", err)),
//     }
// }






// pub async fn transfer_from_cketh(
//     ledger_canister_id: Principal,
//     from: Principal,
//     to: Principal,
//     amount: Nat,
// ) -> Result<Nat, String> {
//     let args = TransferFromArgs {
//         to: TransferAccount {
//             owner: to,
//             subaccount: None,
//         },
//         fee: None,
//         spender_subaccount: None,
//         from: TransferAccount {
//             owner: from,
//             subaccount: None,
//         },
//         memo: None,
//         created_at_time: None,
//         amount,
//     };
//     let (result,): (TransferFromResult,) = call(ledger_canister_id, "icrc2_transfer_from", (args,))
//         .await
//         .map_err(|e| e.1)?;

//     match result {
//         TransferFromResult::Ok(balance) => Ok(balance),
//         TransferFromResult::Err(err) => Err(format!("{:?}", err)),
//     }
// }
