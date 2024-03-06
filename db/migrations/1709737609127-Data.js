module.exports = class Data1709737609127 {
    name = 'Data1709737609127'

    async up(db) {
        await db.query(`ALTER TABLE "transfer" ADD "fee" numeric NOT NULL`)
        await db.query(`CREATE UNIQUE INDEX "IDX_02baf531e4f422d2e077b919f4" ON "transfer" ("fee") `)
    }

    async down(db) {
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "fee"`)
        await db.query(`DROP INDEX "public"."IDX_02baf531e4f422d2e077b919f4"`)
    }
}
