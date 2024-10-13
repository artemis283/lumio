import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CACRK3OMKRE3WL3YKVFPOHWSN3NE7Z7PFFFOWDUAA7DMZIKZ5OFXUOA6",
  }
} as const

export type LumioDataKey = {tag: "Init", values: void} | {tag: "DebtKey", values: readonly [string, string]};

export type Currency = {tag: "USD", values: void} | {tag: "EUR", values: void} | {tag: "XLM", values: void};


/**
 * Price data for an asset at a specific timestamp
 */
export interface PriceData {
  price: i128;
  timestamp: u64;
}

/**
 * Asset type
 */
export type Asset = {tag: "Stellar", values: readonly [string]} | {tag: "Other", values: readonly [string]};

export const Errors = {

}

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: ({debts, base_currency}: {debts: Array<readonly [string, string, i128]>, base_currency: Currency}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a pay transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  pay: ({from, to, amount_}: {from: string, to: string, amount_: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a pay_whole transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  pay_whole: ({from, to}: {from: string, to: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_debt transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_debt: ({from, to}: {from: string, to: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAEaW5pdAAAAAIAAAAAAAAABWRlYnRzAAAAAAAD6gAAA+0AAAADAAAAEwAAABMAAAALAAAAAAAAAA1iYXNlX2N1cnJlbmN5AAAAAAAH0AAAAAhDdXJyZW5jeQAAAAA=",
        "AAAAAAAAAAAAAAADcGF5AAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAHYW1vdW50XwAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAAJcGF5X3dob2xlAAAAAAAAAgAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAIZ2V0X2RlYnQAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAABAAAACw==",
        "AAAAAgAAAAAAAAAAAAAADEx1bWlvRGF0YUtleQAAAAIAAAAAAAAAAAAAAARJbml0AAAAAQAAAAAAAAAHRGVidEtleQAAAAACAAAAEwAAABM=",
        "AAAAAgAAAAAAAAAAAAAACEN1cnJlbmN5AAAAAwAAAAAAAAAAAAAAA1VTRAAAAAAAAAAAAAAAAANFVVIAAAAAAAAAAAAAAAADWExNAA==",
        "AAAAAQAAAC9QcmljZSBkYXRhIGZvciBhbiBhc3NldCBhdCBhIHNwZWNpZmljIHRpbWVzdGFtcAAAAAAAAAAACVByaWNlRGF0YQAAAAAAAAIAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAJdGltZXN0YW1wAAAAAAAABg==",
        "AAAAAgAAAApBc3NldCB0eXBlAAAAAAAAAAAABUFzc2V0AAAAAAAAAgAAAAEAAAAAAAAAB1N0ZWxsYXIAAAAAAQAAABMAAAABAAAAAAAAAAVPdGhlcgAAAAAAAAEAAAAR" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        pay: this.txFromJSON<null>,
        pay_whole: this.txFromJSON<null>,
        get_debt: this.txFromJSON<i128>
  }
}