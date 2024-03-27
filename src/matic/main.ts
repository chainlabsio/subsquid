import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Coin, Transfer, Network } from "../model";
import * as erc20abi from "../abi/erc20";
import { processor, MATIC_USDC_ADDRESS } from "./processor";
import { ethers } from "ethers";

processor.run(
    new TypeormDatabase({
        supportHotBlocks: true,
        stateSchema: "matic_processor",
    }),
    async (ctx) => {
        const transfers: Transfer[] = [];
        for (let c of ctx.blocks) {
            for (let log of c.logs) {
                let { from, to, value } = erc20abi.events.Transfer.decode(log);
                let coin: Coin;

                switch (log.address) {
                    case MATIC_USDC_ADDRESS:
                        coin = Coin.USDC;
                        break;
                    default:
                        coin = Coin.USDT;
                        break;
                }

                transfers.push(
                    new Transfer({
                        id: log.id,
                        network: Network.Polygon,
                        block: c.header.height,
                        timestamp: new Date(c.header.timestamp),
                        from,
                        to,
                        value,
                        txHash: log.transaction!.hash,
                        gasUsed: log.transaction!.gasUsed,
                        gasPrice: log.transaction!.gasPrice,
                        txFee: ethers.formatEther(
                            log.transaction!.gasUsed * log.transaction!.gasPrice
                        ),
                        coin,
                    })
                );
            }
        }
        await ctx.store.upsert(transfers);
    }
);
