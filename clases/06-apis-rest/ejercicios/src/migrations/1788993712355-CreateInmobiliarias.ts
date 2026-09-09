import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInmobiliarias1788993712355 implements MigrationInterface {
    name = 'CreateInmobiliarias1788993712355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inmobiliarias" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre_fantasia" varchar(100) NOT NULL, "telefono" varchar(30) NOT NULL, "email" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_d30061021e7aa1f108360b79cef" UNIQUE ("nombre_fantasia"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "inmobiliarias"`);
    }

}
