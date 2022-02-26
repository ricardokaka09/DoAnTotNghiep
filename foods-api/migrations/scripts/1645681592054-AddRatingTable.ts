import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRatingTable1645681592054 implements MigrationInterface {
  name = 'AddRatingTable1645681592054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ratings (ratingID char(36) NOT NULL,
      userID char(36) NULL,
      productID char(36) NULL,
      rating varchar(255) NULL,
      createdBy char(36) NULL,
      createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (ratingID)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE ratings ADD CONSTRAINT FK_3d455705d250cd5ec7086d3d9ab FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE ratings ADD CONSTRAINT FK_1dede782e989a40b99a5549c957 FOREIGN KEY (productID) REFERENCES products(productID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE ratings ADD CONSTRAINT FK_b7b4a2605ef6219ac083bbc4838 FOREIGN KEY (createdBy) REFERENCES users(userID) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ratings DROP FOREIGN KEY FK_b7b4a2605ef6219ac083bbc4838`,
    );
    await queryRunner.query(
      `ALTER TABLE ratings DROP FOREIGN KEY FK_1dede782e989a40b99a5549c957`,
    );
    await queryRunner.query(
      `ALTER TABLE ratings DROP FOREIGN KEY FK_3d455705d250cd5ec7086d3d9ab`,
    );
    await queryRunner.query(`DROP TABLE ratings`);
  }
}
