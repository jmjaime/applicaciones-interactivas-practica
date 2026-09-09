import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePropiedades1788993739004 implements MigrationInterface {
    name = 'CreatePropiedades1788993739004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "propiedades" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "titulo" varchar(150) NOT NULL, "descripcion" text, "tipo" text NOT NULL, "operacion" text NOT NULL, "precio" float NOT NULL, "moneda" text NOT NULL, "direccion" varchar(200) NOT NULL, "zona" varchar(100) NOT NULL, "superficie_cubierta" float, "superficie_total" float NOT NULL, "ambientes" integer, "dormitorios" integer, "banios" integer, "antiguedad" integer, "estado" text NOT NULL DEFAULT ('BORRADOR'), "inmobiliaria_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "propiedades"`);
    }

}
