import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Network} from "./_network"
import {Coin} from "./_coin"

@Entity_()
export class Transfer {
    constructor(props?: Partial<Transfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 8, nullable: false})
    network!: Network

    @Index_()
    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("text", {nullable: false})
    from!: string

    @Index_()
    @Column_("text", {nullable: false})
    to!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    @Index_()
    @Column_("text", {nullable: false})
    txHash!: string

    @Column_("text", {nullable: false})
    txFee!: string

    @Column_("varchar", {length: 4, nullable: false})
    coin!: Coin

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    gasUsed!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    gasPrice!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    maxFeePerGas!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    maxPriorityFeePerGas!: bigint | undefined | null
}
