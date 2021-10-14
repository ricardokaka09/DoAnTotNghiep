import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAccessesTable1633860213862 implements MigrationInterface {
  name = 'AddUserAccessesTable1633860213862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE  stores  ( storeID  char(36) NOT NULL,  name  varchar(255) NOT NULL,  description  text NULL,  photos  text NULL,  address  varchar(255) NOT NULL,  phoneNumber  varchar(255) NOT NULL,  email  varchar(255) NOT NULL,  logo  varchar(255) NULL,  status  varchar(255) NOT NULL DEFAULT 'VERIFIED',  createdBy  char(36) NULL,  createdAt  datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),  updatedAt  datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX  IDX_3f8bd5e81718f54faee66f0db9  ( phoneNumber ), UNIQUE INDEX  IDX_4a946bd8ef9834431ade78d639  ( email ), PRIMARY KEY ( storeID )) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE  user_accesses  ( userAccessID  char(36) NOT NULL,  storeID  char(36) NULL,  userID  char(36) NULL,  roleName  int(255) NOT NULL,  status  varchar(255) NOT NULL,  createdBy  char(36) NULL,  createdAt  datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),  updatedAt  datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY ( userAccessID )) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE  stores  ADD CONSTRAINT  FK_eac4d5c3817766bd7faf908779d  FOREIGN KEY ( createdBy ) REFERENCES  users ( userID ) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE  user_accesses  ADD CONSTRAINT  FK_f53637effa268e2baaa8e012d94  FOREIGN KEY ( storeID ) REFERENCES  stores ( storeID ) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE  user_accesses  ADD CONSTRAINT  FK_cc93e366a142528d32c6d83c4a2  FOREIGN KEY ( userID ) REFERENCES  users ( userID ) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE  user_accesses  ADD CONSTRAINT  FK_0a8d012f0443e85b8016ca2825c  FOREIGN KEY ( createdBy ) REFERENCES  users ( userID ) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE  user_accesses  DROP FOREIGN KEY  FK_0a8d012f0443e85b8016ca2825c `,
    );
    await queryRunner.query(
      `ALTER TABLE  user_accesses  DROP FOREIGN KEY  FK_cc93e366a142528d32c6d83c4a2 `,
    );
    await queryRunner.query(
      `ALTER TABLE  user_accesses  DROP FOREIGN KEY  FK_f53637effa268e2baaa8e012d94 `,
    );
    await queryRunner.query(
      `ALTER TABLE  stores  DROP FOREIGN KEY  FK_eac4d5c3817766bd7faf908779d `,
    );
    await queryRunner.query(`DROP TABLE  user_accesses `);
    await queryRunner.query(
      `DROP INDEX  IDX_4a946bd8ef9834431ade78d639  ON  stores `,
    );
    await queryRunner.query(
      `DROP INDEX  IDX_3f8bd5e81718f54faee66f0db9  ON  stores `,
    );
    await queryRunner.query(`DROP TABLE  stores `);
  }
}
