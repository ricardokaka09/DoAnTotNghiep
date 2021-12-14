import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersTable1639498466036 implements MigrationInterface {
  name = 'CreateOrdersTable1639498466036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE orders (orderID char(36) NOT NULL, storeID char(36) NULL, userID char(36) NULL, name varchar(255) NOT NULL, description varchar(255) NULL, totalAmount int NULL DEFAULT '0', originalAmount int NULL DEFAULT '0', discount int NULL DEFAULT '0', fee int NULL DEFAULT '0', type varchar(255) NULL, status varchar(255) NOT NULL DEFAULT 'PENDING', receivedAt json NULL, createdBy varchar(255) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (orderID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE order_logs (orderLogID char(36) NOT NULL, orderID char(36) NULL, storeID char(36) NULL, userID char(36) NULL, name varchar(255) NOT NULL, description varchar(255) NULL, totalAmount int NULL DEFAULT '0', originalAmount int NULL DEFAULT '0', discount int NULL DEFAULT '0', fee int NULL DEFAULT '0', type varchar(255) NULL, status varchar(255) NULL, receivedAt json NULL, createdBy char(36) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), event varchar(255) NOT NULL, title varchar(255) NULL, PRIMARY KEY (orderLogID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE order_products (orderProductID char(36) NOT NULL, orderID char(36) NULL, storeID char(36) NULL, userID char(36) NULL, productID char(36) NULL, quantity int NULL DEFAULT '0', createdBy char(36) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (orderProductID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE orders ADD CONSTRAINT FK_cf5f8372e47f741a7141f44220e FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE orders ADD CONSTRAINT FK_3bb280ae57f87198f25d9c98422 FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_logs ADD CONSTRAINT FK_0e499778319ff4f7d7f01027b0c FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_logs ADD CONSTRAINT FK_a5f6f4b264a8f5b35f319521ae3 FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_logs ADD CONSTRAINT FK_17ad736782099237f4e2d6548de FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_logs ADD CONSTRAINT FK_f61c4ca006eb972a1c6643c9257 FOREIGN KEY (createdBy) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_products ADD CONSTRAINT FK_c4af17d03f2dd6162265c6c5d54 FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_products ADD CONSTRAINT FK_7cfa5b303c13fbc656e54d4fc4f FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_products ADD CONSTRAINT FK_f9851a6cec22092bf54d2ce7504 FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_products ADD CONSTRAINT FK_de8d68f732103f731d2a858fe54 FOREIGN KEY (productID) REFERENCES products(productID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE order_products ADD CONSTRAINT FK_17b09dfc9d3528c0b604f5e3625 FOREIGN KEY (createdBy) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
