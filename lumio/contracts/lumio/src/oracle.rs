use crate::{constants::ORACLE_STALNESS_THRESHOLD, error::LumioError, types::Currency};
use sep_40_oracle::{Asset, PriceFeedClient};
use soroban_sdk::{panic_with_error, Address, Env, String, Symbol};

pub(crate) fn get_price(env: &Env, currency: Currency) -> i128 {
    let oracle_client = reflector_client(env);
    let asset = currency_to_asset(env, currency);

    if let Some(price_data) = oracle_client.lastprice(&asset) {
        if env.ledger().timestamp() > price_data.timestamp + ORACLE_STALNESS_THRESHOLD {
            panic_with_error!(env, LumioError::StalePrice);
        }
        price_data.price
    } else {
        panic_with_error!(env, LumioError::OracleFailure);
    }
}

pub(crate) fn get_quote_decimals(env: &Env) -> u32 {
    let oracle_client = reflector_client(env);
    oracle_client.decimals()
}

fn currency_to_asset(env: &Env, currency: Currency) -> Asset {
    match currency {
        Currency::USD => Asset::Other(Symbol::new(&env, "USDT")),
        Currency::EUR => Asset::Other(Symbol::new(&env, "EURC")),
        Currency::XLM => Asset::Other(Symbol::new(&env, "XLM")),
    }
}

fn reflector_client(e: &Env) -> PriceFeedClient {
    let reflector = Address::from_string(&String::from_str(
        e,
        "CCYOZJCOPG34LLQQ7N24YXBM7LL62R7ONMZ3G6WZAAYPB5OYKOMJRN63",
    ));
    PriceFeedClient::new(e, &reflector)
}
