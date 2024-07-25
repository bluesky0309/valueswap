# #!/bin/bash

# set -e

# echo "____________________Creating and using DevJourney identity_________________________"
# # Create and use the DevJourney identity
# dfx identity new DevJourney || true
# dfx identity use DevJourney

# # Get the principal ID for the minter account
# export MINTER=$(dfx identity get-principal)
# echo "MINTER principal: $MINTER"

# # Function to deploy a token ledger
# deploy_token() {
#   local TOKEN_NAME=$1
#   local TOKEN_SYMBOL=$2
#   local CANISTER_NAME=$3
  
#   echo "__________________________Deploying $TOKEN_NAME__________________________"
#   echo "Token Name: $TOKEN_NAME"
#   echo "Token Symbol: $TOKEN_SYMBOL"

#   # Set initial parameters
#   export PRE_MINTED_TOKENS=10_000_000_000
#   export TRANSFER_FEE=10_000

#   # Switch to the default identity and get its principal ID
#   dfx identity use default
#   export DEFAULT=$(dfx identity get-principal)
#   echo "DEFAULT principal: $DEFAULT"

#   # Set archive controller as the default identity for now
#   export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

#   # Set archive options
#   export TRIGGER_THRESHOLD=2000
#   export NUM_OF_BLOCK_TO_ARCHIVE=1000
#   export CYCLE_FOR_ARCHIVE_CREATION=10000000000000
#   export FEATURE_FLAGS=true

#   # Prepare deploy arguments
#   DEPLOY_ARGUMENTS="(variant {Init = record {
#     token_symbol = \"${TOKEN_SYMBOL}\";
#     token_name = \"${TOKEN_NAME}\";
#     minting_account = record { owner = principal \"${MINTER}\" };
#     transfer_fee = ${TRANSFER_FEE};
#     metadata = vec {};
#     feature_flags = opt record{icrc2 = ${FEATURE_FLAGS}};
#     initial_balances = vec { record { record { owner = principal \"${DEFAULT}\"; }; ${PRE_MINTED_TOKENS}; }; };
#     archive_options = record {
#       num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
#       trigger_threshold = ${TRIGGER_THRESHOLD};
#       controller_id = principal \"${ARCHIVE_CONTROLLER}\";
#       cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
#     };
#   }})"
#   echo "Deploy arguments: $DEPLOY_ARGUMENTS"

#   # Deploy the canister
#   dfx deploy ${CANISTER_NAME} --argument "$DEPLOY_ARGUMENTS"

#   echo "$TOKEN_NAME got deployed"
# }

# # Deploy ckBTC
# deploy_token "ckBTC" "ckBTC" "ckbtc_ledger"

# # Switch back to DevJourney for the next token deployment
# dfx identity use DevJourney

# # Deploy ckETH
# deploy_token "ckETH" "ckETH" "cketh_ledger"
