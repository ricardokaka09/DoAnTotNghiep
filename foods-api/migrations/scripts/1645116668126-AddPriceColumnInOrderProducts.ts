import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceColumnInOrderProducts1645116668126
  implements MigrationInterface
{
  name = 'AddPriceColumnInOrderProducts1645116668126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE order_products ADD price int NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE order_products ADD name varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE order_products DROP COLUMN price`);
    await queryRunner.query(`ALTER TABLE order_products DROP COLUMN name`);
  }
}
