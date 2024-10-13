import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CCMMXDMVQFZEBNF45VGL5OU37OR6B2O2KFJ3QULJ6D3SHAUXQUA3FQJZ",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAEaW5pdAAAAAIAAAAAAAAABWRlYnRzAAAAAAAD6gAAB9AAAAAERGVidAAAAAAAAAANYmFzZV9jdXJyZW5jeQAAAAAAB9AAAAAIQ3VycmVuY3kAAAAA",
            "AAAAAAAAAAAAAAADcGF5AAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAHYW1vdW50XwAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAAJcGF5X3dob2xlAAAAAAAAAgAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAIZ2V0X2RlYnQAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAABAAAACw==",
            "AAAAAgAAAAAAAAAAAAAADEx1bWlvRGF0YUtleQAAAAIAAAAAAAAAAAAAAARJbml0AAAAAQAAAAAAAAAHRGVidEtleQAAAAACAAAAEwAAABM=",
            "AAAAAgAAAAAAAAAAAAAACEN1cnJlbmN5AAAAAwAAAAAAAAAAAAAAA1VTRAAAAAAAAAAAAAAAAANFVVIAAAAAAAAAAAAAAAADWExNAA==",
            "AAAAAQAAAC9QcmljZSBkYXRhIGZvciBhbiBhc3NldCBhdCBhIHNwZWNpZmljIHRpbWVzdGFtcAAAAAAAAAAACVByaWNlRGF0YQAAAAAAAAIAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAJdGltZXN0YW1wAAAAAAAABg==",
            "AAAAAgAAAApBc3NldCB0eXBlAAAAAAAAAAAABUFzc2V0AAAAAAAAAgAAAAEAAAAAAAAAB1N0ZWxsYXIAAAAAAQAAABMAAAABAAAAAAAAAAVPdGhlcgAAAAAAAAEAAAAR"]), options);
        this.options = options;
    }
    fromJSON = {
        init: (this.txFromJSON),
        pay: (this.txFromJSON),
        pay_whole: (this.txFromJSON),
        get_debt: (this.txFromJSON)
    };
}
