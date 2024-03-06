import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Burn, Transfer} from './model'
import * as usdtAbi from "./abi/0xdAC17F958D2ee523a2206206994597C13D831ec7";
import {processor} from './processor'


// processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
//     const burns: Burn[] = []
//     for (let c of ctx.blocks) {
//         for (let tx of c.transactions) {
//             // decode and normalize the tx data
//             burns.push(
//                 new Burn({
//                     id: tx.id,
//                     block: c.header.height,
//                     address: tx.from,
//                     value: tx.value,
//                     txHash: tx.hash,
//                 })
//             )
//         }
//     }
//     // apply vectorized transformations and aggregations
//     const burned = burns.reduce((acc, b) => acc + b.value, 0n) / 1_000_000_000n
//     const startBlock = ctx.blocks.at(0)?.header.height
//     const endBlock = ctx.blocks.at(-1)?.header.height
//     ctx.log.info(`Burned ${burned} Gwei from ${startBlock} to ${endBlock}`)

//     // upsert batches of entities with batch-optimized ctx.store.save
//     await ctx.store.upsert(burns)
// })

processor.run(new TypeormDatabase({supportHotBlocks: true}), async ctx => {
    const transfers: Transfer[] = []
    for (let block of ctx.blocks) {
      for (let log of block.logs) {
        // hints from xin:
        // in this log, a transactionHash should be available
        // meantime, you can find tx in ctx.transactions
        // after locating correct tx, gasUsed is likely what you want
        let {from, to, value} = usdtAbi.events.Transfer.decode(log)
        transfers.push(new Transfer({
          id: log.id,
          from, to, value
        }))
      }
    }
    await ctx.store.insert(transfers)
  })
