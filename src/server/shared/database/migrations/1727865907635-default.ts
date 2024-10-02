import { MigrationInterface, QueryRunner } from "typeorm";

export class default1727865907635 implements MigrationInterface {
    name = 'default1727865907635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_b4e49a5a0f51a9920dc84b8c584"`);
        await queryRunner.query(`ALTER TABLE "records" RENAME COLUMN "bankId" TO "bankCode"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "bankCode" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_939f3e4d6bc1a325de41d5b163f" FOREIGN KEY ("bankCode") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_939f3e4d6bc1a325de41d5b163f"`);
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "bankCode"`);
        await queryRunner.query(`ALTER TABLE "records" RENAME COLUMN "bankCode" TO "bankId"`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_b4e49a5a0f51a9920dc84b8c584" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
