import { MigrationInterface, QueryRunner } from "typeorm";

export class default1727807369782 implements MigrationInterface {
    name = 'default1727807369782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_7a5a8f5339166edf3f90712610d"`);
        await queryRunner.query(`ALTER TABLE "records" DROP COLUMN "bankcode"`);
        await queryRunner.query(`ALTER TABLE "records" ALTER COLUMN "bankCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_939f3e4d6bc1a325de41d5b163f" FOREIGN KEY ("bankCode") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_939f3e4d6bc1a325de41d5b163f"`);
        await queryRunner.query(`ALTER TABLE "records" ALTER COLUMN "bankCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "records" ADD "bankcode" integer`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_7a5a8f5339166edf3f90712610d" FOREIGN KEY ("bankcode") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
