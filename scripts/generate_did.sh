
#!/usr/bin/env bash
function generate_did() {
    local canister=$1
    # canister_root="src/$canister"
    canister_root="/Users/admin/Desktop/qb/valueswap/src/$canister"


    echo $canister_root

# /Users/admin/Desktop/qb/valueswap/src/valueswap_backend/Cargo.toml
    cargo build --manifest-path="$canister_root/Cargo.toml" \
    --target wasm32-unknown-unknown \
    --release --package "$canister"

# /Users/admin/Desktop/qb/valueswap/target/wasm32-unknown-unknown/release/valueswap_backend.wasm
    candid-extractor "/Users/admin/Desktop/qb/valueswap/target/wasm32-unknown-unknown/release/$canister.wasm" > "$canister_root/$canister.did"

    # candid-extractor "target/wasm32-unknown-unknown/release/$canister.wasm" > "$canister_root/$canister.did"
}



# List of canisters to generate candid files for 
# (comma separated list of canister names)

CANISTERS=valueswap_backend

for canister in $(echo $CANISTERS | sed "s/,/ /g")
do
  generate_did "$canister"
done

