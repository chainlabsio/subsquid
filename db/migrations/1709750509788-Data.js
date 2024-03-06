module.exports = class Data1709750509788 {
    name = 'Data1709750509788'

    async up(db) {
        await db.query(`ALTER TABLE "transfer" ALTER COLUMN "gas_used" SET NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "transfer" ALTER COLUMN "gas_used" DROP NOT NULL`)
    }
}
