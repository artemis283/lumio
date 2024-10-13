use soroban_sdk::{symbol_short, Address, Env};

pub(crate) fn emit_pay(e: &Env, from: Address, to: Address, amount: i128) {
    let topics = (symbol_short!("pay"), from, to);
    e.events().publish(topics, amount);
}
