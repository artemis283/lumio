use soroban_sdk::{self, contracterror};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub(crate) enum LumioError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    NegativeAmount = 3,
    OracleFailure = 4,
    StalePrice = 5,
}
