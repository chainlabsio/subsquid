// import { assertNotNull } from "@subsquid/util-internal";
// import { lookupArchive } from "@subsquid/archive-registry";
// import {
//     BlockHeader,
//     DataHandlerContext,
//     EvmBatchProcessor,
//     EvmBatchProcessorFields,
//     Log as _Log,
//     Transaction as _Transaction,
// } from "@subsquid/evm-processor";
// import { Store } from "@subsquid/typeorm-store";
// import * as erc20abi from "../abi/erc20";

// export const BSC_USDC_ADDRESS =
//     "0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2".toLowerCase();

// export const BSC_USDT_ADDRESS =
//     "0x55d398326f99059fF775485246999027B3197955".toLowerCase();

// export const BSC_SHIB_ADDRESS =
//     "0x2859e4544c4bb03966803b044a93563bd2d0dd4d".toLowerCase();

// export const processor = new EvmBatchProcessor()
//     // Lookup archive by the network name in Subsquid registry
//     // See https://docs.subsquid.io/evm-indexing/supported-networks/
//     .setGateway(lookupArchive("binance"))
//     // Chain RPC endpoint is required for
//     //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
//     //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
//     .setRpcEndpoint({
//         // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
//         // https://docs.subsquid.io/deploy-squid/env-variables/
//         url: assertNotNull(process.env.RPC_ENDPOINT_BSC),
//         // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
//         rateLimit: 10,
//     })
//     .setFinalityConfirmation(75)
//     .setFields({
//         transaction: {
//             hash: true,
//             gasPrice: true,
//             gasUsed: true,
//             maxFeePerGas: true,
//             maxPriorityFeePerGas: true,
//         },
//     })
//     .addLog({
//         address: [BSC_USDC_ADDRESS, BSC_USDT_ADDRESS, BSC_SHIB_ADDRESS],
//         topic0: [erc20abi.events.Transfer.topic],
//         transaction: true,
//     });

// export type Fields = EvmBatchProcessorFields<typeof processor>;
// export type Context = DataHandlerContext<Store, Fields>;
// export type Block = BlockHeader<Fields>;
// export type Log = _Log<Fields>;
// export type Transaction = _Transaction<Fields>;
