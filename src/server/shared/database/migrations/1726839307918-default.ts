import { MigrationInterface, QueryRunner } from "typeorm";

export class default1726839307918 implements MigrationInterface {
    name = 'default1726839307918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "records" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "status_code" integer NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "teste" text NOT NULL, "status" character varying(10) NOT NULL, "request_time" integer NOT NULL, "payload_response" jsonb NOT NULL, "bank_id" integer, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banks" ("id" SERIAL NOT NULL, "name" text NOT NULL, "teste" text NOT NULL, CONSTRAINT "PK_3975b5f684ec241e3901db62d77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "records" ADD CONSTRAINT "FK_c9ab4eec66a51f7f9ee668c4ddb" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "records" DROP CONSTRAINT "FK_c9ab4eec66a51f7f9ee668c4ddb"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`DROP TABLE "records"`);
    }

}
