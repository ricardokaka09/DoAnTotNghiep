import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { sign } from 'jsonwebtoken';
import { UsersService } from './users.service';
import { ConfigService } from '../../configs/configs.service';
import { UserCombinedService } from './user.combined.service';
import { CreateUserDto, LoginWithEmailPasswordDto } from './models/users.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userCombinedService: UserCombinedService,
  ) {}
  private readonly configService = new ConfigService();

  @Post('register')
  async createUser(@Body() data: CreateUserDto) {
    try {
      const newUser = await this.userCombinedService.createUser({
        ...data,
        status: 'INACTIVE',
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }
  @Get('/verifying')
  @ApiHeader({
    name: 'token',
    description: 'Custom header',
  })
  @UseGuards(AuthGuard('verifying'))
  async createUserVerified(@Request() { user }, @Body() data) {
    try {
      const newUser = await this.usersService.updateOne({
        query: { userID: user.userID },
        data: { ...data, status: 'ACTIVE' },
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('local_password'))
  @UsePipes(new ValidationPipe())
  async loginPage(
    @Request() { user },
    @Body() data: LoginWithEmailPasswordDto,
  ) {
    try {
      const { userID, fullName, changePasswordAt, status } = user;

      const payload = {
        userID,
        fullName,
        status,
        changePasswordAt,
      };

      const accessToken = sign(payload, this.configService.jwtSecret, {
        expiresIn: '90d',
      });

      return {
        accessToken,
        status,
        userID,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findOne(@Request() { user }) {
    try {
      console.log(user);
      const userAccess = await this.usersService.getCurrentUserCredentials(
        { userID: user.userID },
        false,
      );

      return userAccess;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
