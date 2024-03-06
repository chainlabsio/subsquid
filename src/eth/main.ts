import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Coin, Transfer, Network } from "../model";
import * as erc20abi from "../abi/erc20";
import { processor, ETH_USDC_ADDRESS } from "./processor";

processor.run(
    new TypeormDatabase({
        supportHotBlocks: true,
        stateSchema: "eth_processor",
    }),
    async (ctx) => {
        const transfers: Transfer[] = [];
        for (let c of ctx.blocks) {
            for (let log of c.logs) {
                let { from, to, value } = erc20abi.events.Transfer.decode(log);
                transfers.push(
                    new Transfer({
                        id: log.id,
                        network: Network.Ethereum,
                        block: c.header.height,
                        timestamp: new Date(c.header.timestamp),
                        from,
                        to,
                        value,
                        txHash: log.transaction!.hash,
                        effectiveGasPrice: log.transaction!.effectiveGasPrice,
                        coin:
                            log.address === ETH_USDC_ADDRESS
                                ? Coin.USDC
                                : Coin.USDT,
                    })
                );
            }
        }
        await ctx.store.upsert(transfers);
    }
);