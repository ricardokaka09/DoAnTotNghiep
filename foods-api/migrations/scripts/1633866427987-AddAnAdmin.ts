import { admin } from '../constaints/admin';
import { createAdmin } from 'migrations/helpers/add_admin';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAnAdmin1633866427987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const { email, password } = admin;
      await createAdmin(email, password);
    } catch (error) {
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
