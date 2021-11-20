import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductCategoryTable1636329554983
  implements MigrationInterface
{
  name = 'AddProductCategoryTable1636329554983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE categories (categoryID char(36) NOT NULL, name varchar(255) NOT NULL, totalProduct int NULL DEFAULT '0', description text NULL, storeID char(36) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (categoryID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE sub_categories (subCategoryID char(36) NOT NULL, categoryID char(36) NOT NULL, name varchar(255) NOT NULL, storeID char(36) NULL, totalProduct int NULL DEFAULT '0', description text NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (subCategoryID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE products (productID char(36) NOT NULL, storeID char(36) NULL, name varchar(255) NOT NULL, description varchar(255) NULL, price int NULL DEFAULT '0', minPrice int NULL DEFAULT '0', photos varchar(255) NULL, thumbNail varchar(255) NULL, type varchar(255) NULL, tag varchar(255) NULL, quantity int NULL DEFAULT '0', categoryID char(36) NULL, subCategoryID char(36) NULL, origin varchar(255) NULL, properties json NULL, trademark varchar(255) NULL, createdBy varchar(255) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (productID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE categories ADD CONSTRAINT FK_90fdb778a3ab5776875c4f3a3ea FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE sub_categories ADD CONSTRAINT FK_2ca1ea97df074502521986f3c80 FOREIGN KEY (categoryID) REFERENCES categories(categoryID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE sub_categories ADD CONSTRAINT FK_a4ed444580fe3dae162a43296f6 FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE products ADD CONSTRAINT FK_6b43334e42037de2757a7728629 FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE products ADD CONSTRAINT FK_16bde4164ef1b208fdd30b0ce49 FOREIGN KEY (categoryID) REFERENCES categories(categoryID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE products ADD CONSTRAINT FK_f8aedcf79b01bfde6c5a9d80653 FOREIGN KEY (subCategoryID) REFERENCES sub_categories(subCategoryID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE products DROP FOREIGN KEY FK_f8aedcf79b01bfde6c5a9d80653`,
    );
    await queryRunner.query(
      `ALTER TABLE products DROP FOREIGN KEY FK_16bde4164ef1b208fdd30b0ce49`,
    );
    await queryRunner.query(
      `ALTER TABLE products DROP FOREIGN KEY FK_6b43334e42037de2757a7728629`,
    );
    await queryRunner.query(
      `ALTER TABLE sub_categories DROP FOREIGN KEY FK_a4ed444580fe3dae162a43296f6`,
    );
    await queryRunner.query(
      `ALTER TABLE sub_categories DROP FOREIGN KEY FK_2ca1ea97df074502521986f3c80`,
    );
    await queryRunner.query(
      `ALTER TABLE categories DROP FOREIGN KEY FK_90fdb778a3ab5776875c4f3a3ea`,
    );
    await queryRunner.query(`DROP TABLE products`);
    await queryRunner.query(`DROP TABLE sub_categories`);
    await queryRunner.query(`DROP TABLE categories`);
  }
}
