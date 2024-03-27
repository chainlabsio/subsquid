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

export const ETH_USDC_ADDRESS =
    "0x7EA2be2df7BA6E54B1A9C70676f668455E329d29".toLowerCase();

export const ETH_USDT_ADDRESS =
    "0xdAC17F958D2ee523a2206206994597C13D831ec7".toLowerCase();

export const ETH_SHIB_ADDRESS =
    "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce".toLowerCase();

export const processor = new EvmBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    .setGateway("https://v2.archive.subsquid.io/network/ethereum-mainnet")
    // Chain RPC endpoint is required for
    //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
    //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
    .setRpcEndpoint({
        // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: assertNotNull(process.env.RPC_ENDPOINT_ETH),
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
        address: [ETH_USDC_ADDRESS, ETH_USDT_ADDRESS, ETH_SHIB_ADDRESS],
        topic0: [erc20abi.events.Transfer.topic],
        transaction: true,
    });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
