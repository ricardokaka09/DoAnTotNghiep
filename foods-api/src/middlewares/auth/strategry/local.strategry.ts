import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../domains/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class LocalPasswordStrategy extends PassportStrategy(
  Strategy,
  'local_password',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.usersService.getCurrentUserCredentials(
      { email },
      true,
    );

    if (!user) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    return user;
  }
}
