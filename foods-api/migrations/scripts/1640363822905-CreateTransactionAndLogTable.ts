import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionAndLogTable1640363822905
  implements MigrationInterface
{
  name = 'CreateTransactionAndLogTable1640363822905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE blogs (blogID char(36) NOT NULL, name varchar(255) NOT NULL, title varchar(255) NULL, content varchar(255) NULL, thumbnail varchar(255) NULL, createdBy char(36) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (blogID)) ENGINE=InnoDB`,
    // );
    await queryRunner.query(
      `CREATE TABLE transactions (transactionID char(36) NOT NULL, storeID char(36) NULL, userID char(36) NULL, orderID char(36) NULL, amount int NOT NULL DEFAULT '0', originAmount int NOT NULL DEFAULT '0', percentFee float NULL DEFAULT '0', fixedFee int NULL DEFAULT '0', manualFee int NULL DEFAULT '0', fee int NULL DEFAULT '0', status varchar(255) NOT NULL, deniedReason varchar(255) NULL, type varchar(255) NOT NULL, note text NULL, createdBy char(36) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (transactionID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE transaction_logs (transactionLogID char(36) NOT NULL, transactionID char(36) NOT NULL, storeID char(36) NULL, orderID char(36) NULL, userID char(36) NULL, amount int NULL DEFAULT '0', originAmount int NULL DEFAULT '0', fee int NULL DEFAULT '0', status varchar(255) NOT NULL, deniedReason varchar(255) NULL, event varchar(255) NOT NULL, type varchar(255) NULL, note text NULL, data text NULL, createdBy char(36) NULL, createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (transactionLogID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE blogs ADD CONSTRAINT FK_2633b9726440bec9222fbfe4fb7 FOREIGN KEY (createdBy) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transactions ADD CONSTRAINT FK_21aa60286dca3578a092d1de209 FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transactions ADD CONSTRAINT FK_3eaf93cd44dfd36b9286d356989 FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transactions ADD CONSTRAINT FK_5c09afd4adef135b4a63403e8b0 FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transactions ADD CONSTRAINT FK_4dcd67cc38a7958c8cbb35b4b3f FOREIGN KEY (createdBy) REFERENCES users(userID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transaction_logs ADD CONSTRAINT FK_aaabd05085eb10e6139c98dbd5a FOREIGN KEY (transactionID) REFERENCES transactions(transactionID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transaction_logs ADD CONSTRAINT FK_3966c6acb82b69316379992c6b0 FOREIGN KEY (storeID) REFERENCES stores(storeID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transaction_logs ADD CONSTRAINT FK_76379c2d5e89c116608bfef770d FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transaction_logs ADD CONSTRAINT FK_f1543f03dd3548839174ed7035d FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE transaction_logs ADD CONSTRAINT FK_a07efd5926c1d361d217bca697e FOREIGN KEY (createdBy) REFERENCES users(userID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
