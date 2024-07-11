echo "____________________Using Identity Minter_________________________"
dfx identity use minter
MINTER=$(dfx identity get-principal)
output=$MINTER  # Replace with your actual command
MINTER_ACCOUNT_ID=$(echo $output | sed 's/.*\. //')
echo $MINTER_ACCOUNT_ID  # Use or store $result as needed in your script

# export MINTER_ACCOUNT_ID=$(dfx ledger account-id)

echo "__________________________Token 1_________________________________"

export TOKEN_A_NAME="icBTC"
export TOKEN_A_SYMBOL="icBTC"

echo "____________________Using default identity_________________________"

dfx identity use default
export DEPLOY_ID=$(dfx identity get-principal)


export PRE_MINTED_TOKENS=10_000_000_000
export TRANSFER_FEE=10_000

dfx identity new archive_controller
dfx identity use archive_controller
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export TRIGGER_THRESHOLD=2000
export NUM_OF_BLOCK_TO_ARCHIVE=1000
export CYCLE_FOR_ARCHIVE_CREATION=10000000000000


export FEATURE_FLAGS=true

dfx deploy token1_ledger --argument "(variant {Init =
record {
     token_symbol = \"${TOKEN_A_SYMBOL}\";
     token_name = \"${TOKEN_A_NAME}\";
     minting_account = record { owner = principal \"${MINTER_ACCOUNT_ID}\" };
     transfer_fee = ${TRANSFER_FEE};
     metadata = vec {};
     feature_flags = opt record{icrc2 = ${FEATURE_FLAGS}};
     initial_balances = vec { record { record { owner = principal \"${DEPLOY_ID}\"; }; ${PRE_MINTED_TOKENS}; }; };
     archive_options = record {
         num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
         trigger_threshold = ${TRIGGER_THRESHOLD};
         controller_id = principal \"${ARCHIVE_CONTROLLER}\";
         cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
     };
 }
})"




export TOKEN_B_NAME="TokenB"
export TOKEN_B_SYMBOL="B"


dfx identity use aarya
export PERSONAL_ID=$(dfx identity get-principal)
dfx deploy token2_ledger --specified-id mxzaz-hqaaa-aaaar-qaada-cai --argument "(variant {Init =
record {
     token_symbol = \"${TOKEN_B_SYMBOL}\";
     token_name = \"${TOKEN_B_NAME}\";
     minting_account = record { owner = principal \"${MINTER_ACCOUNT_ID}\" };
     transfer_fee = ${TRANSFER_FEE};
     metadata = vec {};
     feature_flags = opt record{icrc2 = ${FEATURE_FLAGS}};
     initial_balances = vec { record { record { owner = principal \"${PERSONAL_ID}\"; }; ${PRE_MINTED_TOKENS}; }; };
     archive_options = record {
         num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
         trigger_threshold = ${TRIGGER_THRESHOLD};
         controller_id = principal \"${ARCHIVE_CONTROLLER}\";
         cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
     };
 }
})"
