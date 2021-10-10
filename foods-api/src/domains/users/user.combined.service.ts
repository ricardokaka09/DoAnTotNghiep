import { Injectable } from '@nestjs/common';
import { UserAccessesService } from '../user_accesses/user_accesses.service';
import { RolesUserAccesses, StatusUserAccesses } from './enums/types';
import { UsersService } from './users.service';

@Injectable()
export class UserCombinedService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userAccessesService: UserAccessesService,
  ) {}

  async createUser(data) {
    try {
      const user = await this.usersService.createOne(data);
      await this.userAccessesService.createOne({
        userID: user.userID,
        roleName: RolesUserAccesses.CLIENT,
        status: StatusUserAccesses.ACCEPTED,
      });

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateUserWhenVerified({ user }) {
    try {
      await Promise.all([
        this.usersService.updateOne({
          query: { userID: user.userID },
          data: { status: 'ACTIVE' },
        }),
        this.userAccessesService.updateOne({
          query: { userAccessID: user.userAccessID },
          data: { status: StatusUserAccesses.ACCEPTED },
        }),
      ]);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
