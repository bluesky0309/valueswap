pub fn constant_product(balances: &[f64; 8], weights: &[f64; 8]) -> f64 {
    balances.iter()
        .zip(weights.iter())
        .map(|(&b, &w)| b.powf(w))
        .product()
}

pub fn spot_price(b_i: f64, w_i: f64, b_o: f64, w_o: f64) -> f64 {
    (b_i / w_i) / (b_o / w_o)
}

pub fn out_given_in(b_i: f64, w_i: f64, b_o: f64, w_o: f64, amount_in: f64) -> f64 {
    b_o * (
        1.0 - (b_i / (b_i + amount_in)).powf(w_i / w_o)
    )
}

pub fn in_given_out(b_i: f64, w_i: f64, b_o: f64, w_o: f64, amount_out: f64) -> f64 {
    b_i * (
        (b_o / (b_o - amount_out)).powf(w_o / w_i) - 1.0
    )
}

// pub fn all_asset_deposit(supply: f64, issued: f64, b_k: f64) -> f64 {
//     (supply + issued) / supply * b_k
// }

pub fn all_asset_withdraw(supply: f64, redeemed: f64, b_k: f64) -> f64 {
    (1.0 - redeemed / supply) * b_k
}

// pub fn single_asset_deposit(supply: f64, amount: f64, b_t: f64, w_t: f64) -> f64 {
//     supply * ((1.0 + amount / b_t).powf(w_t) - 1.0)
// }

pub fn single_asset_withdraw(supply: f64, redeemed: f64, b_t: f64, w_t: f64) -> f64 {
    b_t * (1.0 - (1.0 - redeemed / supply).powf(1.0 / w_t))
}
