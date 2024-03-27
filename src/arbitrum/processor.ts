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

export const ARBITRUM_USDC_ADDRESS =
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831".toLowerCase();

export const ARBITRUM_USDT_ADDRESS =
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9".toLowerCase();

export const processor = new EvmBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    .setGateway(lookupArchive("arbitrum"))
    // Chain RPC endpoint is required for
    //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
    //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
    .setRpcEndpoint({
        // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: assertNotNull(process.env.RPC_ENDPOINT_ARBITRUM),
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
        address: [ARBITRUM_USDC_ADDRESS, ARBITRUM_USDT_ADDRESS],
        topic0: [erc20abi.events.Transfer.topic],
        transaction: true,
    });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
