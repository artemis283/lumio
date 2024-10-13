use soroban_sdk::{contracttype, Address};

#[derive(PartialEq)]
#[contracttype]
pub enum Currency {
    USD,
    EUR,
    XLM,
}

pub type Debt = (Address, Address, i128);
