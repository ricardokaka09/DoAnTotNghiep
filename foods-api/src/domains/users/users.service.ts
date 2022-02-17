import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '../../configs/configs.service';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from './models/users.schema';
import * as bcrypt from 'bcryptjs';
import { ExtendedUsers } from '../extended_users/models/extended_users.schema';
import { SendGrid } from '../../helpers/sendMail';
import { sign } from 'jsonwebtoken';
import { buildVerifyEmail } from '../../helpers/getHtmlTemplate';
import { NotFoundException } from '@nestjs/common';
import { CreateOneData } from './models/users.interface';

@EntityRepository(Users)
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(ExtendedUsers)
    private readonly extendedUserRepository: Repository<ExtendedUsers>,
  ) {}
  private readonly configService = new ConfigService();
  private readonly sendGrid = new SendGrid(
    this.configService.sendGridApi,
    this.configService.sendGridSenderDefault,
  );
  async createOne(createData: CreateOneData, type?: string): Promise<Users> {
    try {
      const { email, password } = createData;
      if (!email) {
        throw new Error('MissingUserIdentity');
      }
      const findExistedUserQuery = [];

      const findExistedUserParameters = {
        email,
      };

      if (email) {
        findExistedUserQuery.push('extended_users.email = :email');
      }

      const existedUser = await this.usersRepository
        .createQueryBuilder('users')
        .innerJoin('users.extendedUser', 'extended_users')
        .where(findExistedUserQuery.join(' and '), findExistedUserParameters)
        .getOne();

      if (existedUser) {
        return existedUser;
      }
      if (password) {
        const hashPass = await bcrypt.hash(
          password,
          this.configService.bcryptSalt,
        );
        createData = {
          ...createData,
          password: hashPass,
        };
      }
      const {
        fullName,
        gender,
        dateOfBirth,
        avatar,
        status,
        ...extendedUserData
      } = createData;

      let newUser = await this.usersRepository.save({
        fullName,
        gender,
        dateOfBirth,
        avatar,
        status,
      });

      const newExtendedUser = await this.extendedUserRepository.save({
        userID: newUser.userID,
        ...extendedUserData,
      });

      newUser = await this.usersRepository.save({
        ...newUser,
        extendedUser: newExtendedUser.userID,
      });

      if (type && type === 'ADD_ADMIN') {
        return newUser;
      }

      const payload = {
        userID: newUser.userID,
      };
      const tokenVerify = sign(
        payload,
        this.configService.jwtVerifyEmailSecret,
        {
          expiresIn: '10d',
        },
      );

      const { html, subject, text } = buildVerifyEmail({ token: tokenVerify });

      await this.sendGrid.sendMailSDK({
        mail: { to: email, html, subject, text },
      });

      return newUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ query, data }): Promise<boolean> {
    try {
      const user = await this.usersRepository.findOne({ where: query });
      if (!user) {
        throw new Error('User not Found');
      }

      await this.usersRepository.update({ userID: user.userID }, data);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getCurrentUserCredentials(query, getPassword?: boolean) {
    try {
      const findingCondition = [];
      const findingPlaceholders = [];

      const { email, phoneNumber, userID } = query;

      if (email) {
        findingCondition.push('eu.email = ?');
        findingPlaceholders.push(email);
      }

      if (phoneNumber) {
        findingCondition.push('eu.phoneNumber = ?');
        findingPlaceholders.push(phoneNumber);
      }

      if (userID) {
        findingCondition.push('u.userID = ?');
        findingPlaceholders.push(userID);
      }

      let additionSelect = '';
      additionSelect += ', eu.email, eu.phoneNumber';

      if (getPassword) {
        additionSelect += ', eu.password, eu.changePasswordAt';
      }

      const [user] = await this.usersRepository.query(
        ` SELECT u.userID, u.fullName, u.status, u.gender, u.dateOfBirth, u.avatar,
        u.createdAt ${additionSelect}
        FROM users as u
        INNER JOIN extended_users as eu
        ON u.userID = eu.userID
        WHERE ${findingCondition.join('AND')}`,
        findingPlaceholders,
      );
      if (!user?.userID) {
        return null;
      }
      const accesses = await this.usersRepository.query(
        `SELECT userAccessID, userID, storeID,
        roleName, status, createdBy FROM user_accesses
        WHERE userID = ?`,
        [user.userID],
      );
      if (!accesses) {
        throw new NotFoundException('User not found');
      }

      return {
        ...user,
        accesses,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
