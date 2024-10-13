use crate::{
    constants::XLM_SCALE,
    error::LumioError,
    events, oracle, storage,
    types::{Currency, Debt},
};
use soroban_sdk::{
    contract, contractimpl, panic_with_error, token::Client as TokenClient, Address, Env, String,
    Vec,
};

#[contract]
pub struct LumioContract;

#[contractimpl]
impl LumioContract {
    pub fn init(e: Env, debts: Vec<(Address, Address, i128)>, base_currency: Currency) {
        if storage::is_init(&e) {
            panic_with_error!(&e, LumioError::AlreadyInitialized);
        }
        storage::set_init(&e);
        storage::extend_instance_ttl(&e);

        let mut quote_decimals = oracle::get_quote_decimals(&e);
        let quote_price = if base_currency != Currency::XLM {
            oracle::get_price(&e, base_currency)
        } else {
            quote_decimals = 7;
            1
        };

        for (from, to, mut amount) in debts.iter() {
            check_non_negative_amount(&e, amount);
            amount = amount * quote_price * XLM_SCALE / (10u128.pow(quote_decimals) as i128);
            storage::adjust_debt(&e, from, to, amount);
        }
    }

    pub fn pay(e: Env, from: Address, to: Address, amount_: i128) {
        if !storage::is_init(&e) {
            panic_with_error!(&e, LumioError::NotInitialized);
        }
        check_non_negative_amount(&e, amount_);
        storage::extend_instance_ttl(&e);

        from.require_auth();

        let mut amount = amount_;

        let debt = storage::get_debt(&e, from.clone(), to.clone());

        if amount > debt {
            amount = debt;
        };

        transfer_xlm(&e, from.clone(), to.clone(), amount);

        storage::adjust_debt(&e, from.clone(), to.clone(), -amount);
        events::emit_pay(&e, from, to, amount);
    }

    pub fn pay_whole(e: Env, from: Address, to: Address) {
        if !storage::is_init(&e) {
            panic_with_error!(&e, LumioError::NotInitialized);
        }
        storage::extend_instance_ttl(&e);

        from.require_auth();

        let debt = storage::get_debt(&e, from.clone(), to.clone());

        transfer_xlm(&e, from.clone(), to.clone(), debt);

        storage::set_debt(&e, from.clone(), to.clone(), 0);
        events::emit_pay(&e, from, to, debt);
    }

    pub fn get_debt(e: Env, from: Address, to: Address) -> i128 {
        if !storage::is_init(&e) {
            panic_with_error!(&e, LumioError::NotInitialized);
        }
        storage::extend_instance_ttl(&e);

        storage::get_debt(&e, from, to)
    }
}

fn transfer_xlm(e: &Env, from: Address, to: Address, amount: i128) {
    let xlm_address = Address::from_string(&String::from_str(
        &e,
        "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    ));

    let xlm = TokenClient::new(e, &xlm_address);
    xlm.transfer(&from, &to, &amount);
}

fn check_non_negative_amount(e: &Env, amount: i128) {
    if amount < 0 {
        panic_with_error!(&e, LumioError::NegativeAmount);
    }
}
