use crate::constants::{STORAGE_BUMP, STORAGE_BUMP_THRESHOLD};
use soroban_sdk::{contracttype, Address, Env};

#[derive(Clone)]
#[contracttype]
pub enum LumioDataKey {
    Init,
    DebtKey(Address, Address),
}

pub(crate) fn extend_instance_ttl(e: &Env) {
    e.storage()
        .instance()
        .extend_ttl(STORAGE_BUMP_THRESHOLD, STORAGE_BUMP);
}

pub(crate) fn is_init(e: &Env) -> bool {
    e.storage().instance().has(&LumioDataKey::Init)
}

pub(crate) fn set_init(e: &Env) {
    e.storage().instance().set(&LumioDataKey::Init, &());
}

pub(crate) fn set_debt(e: &Env, from: Address, to: Address, amount: i128) {
    let debt_key = LumioDataKey::DebtKey(from, to);
    e.storage().persistent().set(&debt_key, &amount);
    e.storage()
        .persistent()
        .extend_ttl(&debt_key, STORAGE_BUMP_THRESHOLD, STORAGE_BUMP);
}

pub(crate) fn get_debt(e: &Env, from: Address, to: Address) -> i128 {
    let debt_key = LumioDataKey::DebtKey(from, to);
    if let Some(debt) = e.storage().persistent().get(&debt_key) {
        e.storage()
            .persistent()
            .extend_ttl(&debt_key, STORAGE_BUMP_THRESHOLD, STORAGE_BUMP);
        debt
    } else {
        0
    }
}

pub(crate) fn adjust_debt(e: &Env, from: Address, to: Address, amount: i128) {
    let debt = get_debt(e, from.clone(), to.clone());
    set_debt(e, from, to, debt + amount);
}
