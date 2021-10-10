import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccesses } from './models/user_accesses.schema';
import { UserAccessesService } from './user_accesses.service';

const userAccessesRepository = TypeOrmModule.forFeature([UserAccesses]);
@Module({
  imports: [userAccessesRepository],
  providers: [UserAccessesService],
  exports: [UserAccessesService, userAccessesRepository],
})
export class UserAccessesModule {}
