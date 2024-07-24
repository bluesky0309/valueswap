cargo build --release --target wasm32-unknown-unknown --package valueswap_backend

candid-extractor target/wasm32-unknown-unknown/release/valueswap_backend.wasm > src/valueswap_backend/valueswap_backend.did

dfx deploy