set -e

dfx identity use default
DEFAULT=$(dfx --identity default identity get-principal)
USER=$(dfx --identity testing identity get-principal)
MINTER=$(dfx --identity minter identity get-principal)
RECIEVER="bkyz2-fmaaa-aaaaa-qaaaq-cai"
CANISTER=$(dfx canister id valueswap_backend)
echo "DEFAULT: $DEFAULT"
echo "USER: $USER"
echo "MINTER: $MINTER"
echo "RECIEVER: $RECIEVER"

echo $CANISTER

function debug_print() {
    echo "State at checkpoint $1"
    # echo "Balance of minter: $(dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {owner = principal \"$MINTER\"})")"
    echo "Balance of default: $(dfx canister call ckbtc_ledger icrc1_balance_of "(record {owner = principal \"$DEFAULT\"})")"
    echo "Balance of user: $(dfx canister call ckbtc_ledger icrc1_balance_of "(record {owner = principal \"$USER\"})")"
    echo "Balance of reciever: $(dfx canister call ckbtc_ledger icrc1_balance_of "(record {owner = principal \"$RECIEVER\"})")"
}

# # # TRANSFER
TRANSFER=$(
dfx --identity default canister call ckbtc_ledger icrc1_transfer "(record { to = record { owner = principal \"$USER\" }; amount = 100000 })")
echo $TRANSFER


# # to approve 
APPROVE=$(dfx --identity testing canister call ckbtc_ledger icrc2_approve "(record { amount = 1000000; spender = record { owner = principal \"$CANISTER\"} })")
echo $APPROVE

echo $(dfx --identity testing canister call ckbtc_ledger icrc2_allowance "(record { account = record { owner = principal \"$USER\"}; spender = record { owner = principal \"$CANISTER\"} })")



# TRANSFER TO USER
USER_TRANSFER=$(dfx canister call valueswap_backend deposit_ckbtc "(100000)" --identity testing)
echo $USER_TRANSFER

debug_print 1
# debug_print 2