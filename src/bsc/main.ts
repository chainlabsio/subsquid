// import { TypeormDatabase } from "@subsquid/typeorm-store";
// import { Coin, Network, Transfer } from "../model";
// import * as erc20abi from "../abi/erc20";
// import { processor, BSC_USDC_ADDRESS, BSC_SHIB_ADDRESS } from "./processor";

// processor.run(
//     new TypeormDatabase({
//         supportHotBlocks: true,
//         stateSchema: "bsc_processor",
//     }),
//     async (ctx) => {
//         const transfers: Transfer[] = [];
//         for (let c of ctx.blocks) {
//             for (let log of c.logs) {
//                 let { from, to, value } = erc20abi.events.Transfer.decode(log);
//                 let coin: Coin;

//                 switch (log.address) {
//                     case BSC_USDC_ADDRESS:
//                         coin = Coin.USDC;
//                         break;
//                     case BSC_SHIB_ADDRESS:
//                         coin = Coin.SHIB;
//                         break;
//                     default:
//                         coin = Coin.USDT;
//                         break;
//                 }

//                 transfers.push(
//                     new Transfer({
//                         id: log.id,
//                         network: Network.Binance,
//                         block: c.header.height,
//                         timestamp: new Date(c.header.timestamp),
//                         from,
//                         to,
//                         value,
//                         txHash: log.transaction!.hash,
//                         gasUsed: log.transaction!.gasUsed,
//                         gasPrice: log.transaction!.gasPrice,
//                         maxFeePerGas: log.transaction!.maxFeePerGas,
//                         maxPriorityFeePerGas:
//                             log.transaction!.maxPriorityFeePerGas,
//                         txFee:
//                             (log.transaction!.gasPrice *
//                                 log.transaction!.gasUsed) /
//                             BigInt(1e18),
//                         coin:
//                             log.address === BSC_USDC_ADDRESS
//                                 ? Coin.USDC
//                                 : Coin.USDT,
//                     })
//                 );
//             }
//         }
//         await ctx.store.upsert(transfers);
//     }
// );
