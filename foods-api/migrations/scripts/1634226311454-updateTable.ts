import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTable1634226311454 implements MigrationInterface {
    name = 'updateTable1634226311454';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user_accesses  DROP COLUMN roleName `);
        await queryRunner.query(`
            ALTER TABLE user_accesses  ADD roleName  int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user_accesses  DROP COLUMN roleName `);
        await queryRunner.query(`
            ALTER TABLE user_accesses  ADD roleName  varchar(255) NOT NULL`);
    }

}
