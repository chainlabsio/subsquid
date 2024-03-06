import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Transfer } from "./model";
import { processor } from "./processor";
import * as usdtAbi from "./abi/0xdAC17F958D2ee523a2206206994597C13D831ec7";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
    const transfers: Transfer[] = [];
    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            let { from, to, value } = usdtAbi.events.Transfer.decode(log);
            transfers.push(
                new Transfer({
                    id: log.id,
                    gasUsed: log.transaction!.gasUsed,
                    from,
                    to,
                    value,
                })
            );
        }
    }
    await ctx.store.insert(transfers);
});
