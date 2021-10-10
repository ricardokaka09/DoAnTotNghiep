import { ExtendedUsers } from '../../src/domains/extended_users/models/extended_users.schema';
import { StatusUserAccesses } from '../../src/domains/users/enums/types';
import { Users, UserStatus } from '../../src/domains/users/models/users.schema';
import { UsersService } from '../../src/domains/users/users.service';
import { UserAccesses } from '../../src/domains/user_accesses/models/user_accesses.schema';
import { UserAccessesService } from '../../src/domains/user_accesses/user_accesses.service';
import { createConnection } from 'typeorm';
import { ConfigService } from '../../src/configs/configs.service';

export const createAdmin = async (email, password) => {
  const configService = new ConfigService();
  const dbConfig: any = configService.databaseConfig;
  dbConfig.autoSchemaSync = false;
  dbConfig.synchronize = false;
  dbConfig.migrationRun = false;

  const timeStamp = Date.now();

  const connection = await createConnection({
    ...dbConfig,
    name: `CreateAdminConnection-${timeStamp}`,
  });

  const usersRepository = connection.getRepository(Users);
  const extendedUsersRepository = connection.getRepository(ExtendedUsers);
  const userAccessesRepository = connection.getRepository(UserAccesses);

  const usersService = new UsersService(
    usersRepository,
    extendedUsersRepository,
  );
  const userAccessesService = new UserAccessesService(userAccessesRepository);

  try {
    const newAdmin = await usersService.createOne(
      {
        email,
        password,
        fullName: 'Admin',
        dateOfBirth: null,
        status: UserStatus.ACTIVE,
      },
      'ADD_ADMIN',
    );

    await userAccessesService.createOne({
      userID: newAdmin.userID,
      roleName: 'ADMIN',
      status: StatusUserAccesses.ACCEPTED,
    });

    await connection.close();
  } catch (error) {
    await connection.close();
    return Promise.reject(error);
  }
};
