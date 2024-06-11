import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1716571286143 implements MigrationInterface {
    name = 'Initial1716571286143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" text NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq6Sc43S1-ZMe4-IFR2DK07vNmh0YIWmMorQ&s', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_9e5b29b50620aadf9af8eccb36d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userId" uuid, "orderDetailId" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_category_categories" ("productsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_119e80e2f1e483e123a03a37064" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4aa91342ff0cdf2e0851efd9dc" ON "products_category_categories" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a98d32aa0a94206767fb9e9b97" ON "products_category_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE TABLE "orders_details_products_products" ("ordersDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_c6950a54cebf7911d69ff3ae7c7" PRIMARY KEY ("ordersDetailsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_20b33011864cbc2067d0083a67" ON "orders_details_products_products" ("ordersDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b802c251834ab9ca59afd8abe" ON "orders_details_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "orders_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_category_categories" ADD CONSTRAINT "FK_4aa91342ff0cdf2e0851efd9dc6" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_category_categories" ADD CONSTRAINT "FK_a98d32aa0a94206767fb9e9b97b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" ADD CONSTRAINT "FK_20b33011864cbc2067d0083a670" FOREIGN KEY ("ordersDetailsId") REFERENCES "orders_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" ADD CONSTRAINT "FK_3b802c251834ab9ca59afd8abe3" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" DROP CONSTRAINT "FK_3b802c251834ab9ca59afd8abe3"`);
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" DROP CONSTRAINT "FK_20b33011864cbc2067d0083a670"`);
        await queryRunner.query(`ALTER TABLE "products_category_categories" DROP CONSTRAINT "FK_a98d32aa0a94206767fb9e9b97b"`);
        await queryRunner.query(`ALTER TABLE "products_category_categories" DROP CONSTRAINT "FK_4aa91342ff0cdf2e0851efd9dc6"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b802c251834ab9ca59afd8abe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20b33011864cbc2067d0083a67"`);
        await queryRunner.query(`DROP TABLE "orders_details_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a98d32aa0a94206767fb9e9b97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4aa91342ff0cdf2e0851efd9dc"`);
        await queryRunner.query(`DROP TABLE "products_category_categories"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
