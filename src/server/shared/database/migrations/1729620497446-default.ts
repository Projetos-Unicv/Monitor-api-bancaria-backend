import { MigrationInterface, QueryRunner } from "typeorm";

export class default1729620497446 implements MigrationInterface {
    name = 'default1729620497446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "records" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "codeResponse" integer NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(10) NOT NULL, "timeRequest" integer NOT NULL, "payloadResponse" jsonb NOT NULL, "detailing" character varying(50) NOT NULL, "bankId" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banks" ("id" SERIAL NOT NULL, "name" text NOT NULL, "bankCode" integer NOT NULL, CONSTRAINT "PK_3975b5f684ec241e3901db62d77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_b4e49a5a0f51a9920dc84b8c584" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_b4e49a5a0f51a9920dc84b8c584"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`DROP TABLE "records"`);
    }

}
