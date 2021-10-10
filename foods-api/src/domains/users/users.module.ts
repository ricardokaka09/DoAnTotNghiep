import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../../configs/configs.module';
import { ConfigService } from '../../configs/configs.service';
import { ExtendedUsers } from '../extended_users/models/extended_users.schema';
import { UserAccesses } from '../user_accesses/models/user_accesses.schema';
import { UserAccessesService } from '../user_accesses/user_accesses.service';
import { Users } from './models/users.schema';
import { UserCombinedService } from './user.combined.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
const usersRepository = TypeOrmModule.forFeature([Users]);
const extendedUserRepository = TypeOrmModule.forFeature([ExtendedUsers]);
const userAccessesRepository = TypeOrmModule.forFeature([UserAccesses]);
@Module({
  imports: [
    ConfigModule,
    usersRepository,
    extendedUserRepository,
    userAccessesRepository,
  ],
  exports: [usersRepository, extendedUserRepository, UsersService],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserCombinedService,
    UserAccessesService,
    ConfigService,
  ],
})
export class UsersModule {}
