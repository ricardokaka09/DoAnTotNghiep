import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1633624881274 implements MigrationInterface {
  name = 'AddUserTable1633624881274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE  extended_users  ( userID  varchar(255) NOT NULL,  email  varchar(255) NULL,  phoneNumber  varchar(255) NULL,  password  text NULL,  changePasswordAt  double NULL,  createdAt  datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),  updatedAt  datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX  IDX_55c78d4f44225ca821151c8bf8  ( email ), UNIQUE INDEX  IDX_18f05e07f4d2f22a32f2610321  ( phoneNumber ), PRIMARY KEY ( userID )) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE  users  ( userID  char(36) NOT NULL,  fullName  varchar(100) NOT NULL,  gender  varchar(10) NULL,  dateOfBirth  date NULL,  avatar  varchar(255) NULL,  status  varchar(255) NULL DEFAULT 'INACTIVE',  extendedUser  varchar(255) NULL,  createdAt  timestamp NULL DEFAULT CURRENT_TIMESTAMP,  updatedAt  timestamp NULL, UNIQUE INDEX  REL_6faad426c7450806f0db2cc911  ( extendedUser ), PRIMARY KEY ( userID )) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE  users  ADD CONSTRAINT  FK_6faad426c7450806f0db2cc911c  FOREIGN KEY ( extendedUser ) REFERENCES  extended_users ( userID ) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE  users  DROP FOREIGN KEY  FK_6faad426c7450806f0db2cc911c `,
    );
    await queryRunner.query(
      `DROP INDEX  REL_6faad426c7450806f0db2cc911  ON  users `,
    );
    await queryRunner.query(`DROP TABLE  users `);
    await queryRunner.query(
      `DROP INDEX  IDX_18f05e07f4d2f22a32f2610321  ON  extended_users `,
    );
    await queryRunner.query(
      `DROP INDEX  IDX_55c78d4f44225ca821151c8bf8  ON  extended_users `,
    );
    await queryRunner.query(`DROP TABLE  extended_users `);
  }
}
