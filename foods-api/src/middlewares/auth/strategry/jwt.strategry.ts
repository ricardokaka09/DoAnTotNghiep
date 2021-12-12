import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../../configs/configs.service';
import { UsersService } from '../../../domains/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: any) {
    const roles = [];
    const personalScopes = [];
    const userData: any = await this.userService.getCurrentUserCredentials(
      { userID: payload.userID },
      false,
    );
    const { accesses } = userData;

    if (!accesses || !accesses.length) {
      return {
        roles,
        personalScopes,
      };
    }

    for (const access of accesses) {
      if (!access) {
        continue;
      }
      roles.push(access['roleName']);
      switch (true) {
        case !!access[`storeID`]:
          personalScopes.push(access['roleName']);
          continue;
        default:
          personalScopes.push(access['roleName']);
          continue;
      }
    }

    if (!userData) {
      throw new UnauthorizedException(
        'Email/phone and  password combination are not found',
      );
    }
    if (userData.status === 'INACTIVE') {
      throw new UnauthorizedException(
        'You need to activate your account by confirming your email',
      );
    }
    if (
      userData.changePasswordAt &&
      userData.changePasswordAt !== payload.changePasswordAt
    ) {
      throw new UnauthorizedException('Your token is expired');
    }

    userData.roles = roles;
    userData.personalScopes = personalScopes;
    return userData;
  }
}
