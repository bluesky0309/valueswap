cargo build --release --target wasm32-unknown-unknown --package valueswap_backend

candid-extractor target/wasm32-unknown-unknown/release/icp_dex_backend.wasm > src/valueswap_backend/valueswap_dex_backend.did

dfx deploy
# dfx canister call uni_swap_backend get_tokens