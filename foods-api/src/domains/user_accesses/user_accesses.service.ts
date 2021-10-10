import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, IsNull, Repository } from 'typeorm';
import { CreateOneData } from './models/user_accesses.interface';
import { UserAccesses } from './models/user_accesses.schema';

@EntityRepository(UserAccesses)
export class UserAccessesService {
  constructor(
    @InjectRepository(UserAccesses)
    private readonly userAccessesRepository: Repository<UserAccesses>,
  ) {}

  async createOne(data: CreateOneData) {
    try {
      const { userID, storeID, roleName } = data;
      const checkExist: any = { userID, storeID, roleName };
      if (!checkExist.storeID) {
        checkExist.storeID = IsNull();
      }
      const existedUserAccess = await this.userAccessesRepository.findOne({
        where: checkExist,
      });
      if (existedUserAccess) {
        return existedUserAccess;
      }
      const userAccess = await this.userAccessesRepository.save(data);

      return userAccess;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async updateOne({ query, data }) {
    try {
      const user = await this.userAccessesRepository.findOne({ where: query });

      if (!user) {
        throw new NotFoundException('User not Found');
      }

      await this.userAccessesRepository.update(
        { userAccessID: query.userAccessID },
        data,
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
