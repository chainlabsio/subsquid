import { assertNotNull } from "@subsquid/util-internal";
import { lookupArchive } from "@subsquid/archive-registry";
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import * as erc20abi from "../abi/erc20";

export const MATIC_USDC_ADDRESS =
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359".toLowerCase();

export const MATIC_USDT_ADDRESS =
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F".toLowerCase();

export const processor = new EvmBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    .setGateway(lookupArchive("polygon"))
    // Chain RPC endpoint is required for
    //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
    //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
    .setRpcEndpoint({
        // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: assertNotNull(process.env.RPC_ENDPOINT_POLYGON),
        // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
        rateLimit: 10,
    })
    .setFinalityConfirmation(75)
    .setFields({
        transaction: {
            hash: true,
            gasPrice: true,
            gasUsed: true,
        },
    })
    .addLog({
        address: [MATIC_USDC_ADDRESS, MATIC_USDT_ADDRESS],
        topic0: [erc20abi.events.Transfer.topic],
        transaction: true,
    });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
