import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../../configs/configs.service';
import { UsersService } from '../../../domains/users/users.service';
import { getRolesScopes } from '../helper/helper';
import { roles as rolesWithScopes } from '../../../constants/roles';

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
    const userData: any = await this.userService.getCurrentUserCredentials(
      { userID: payload.userID },
      false,
    );
    const { accesses } = userData as any;

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
    const { roles, firstScopes, personalScopes } = getRolesScopes(
      accesses,
      rolesWithScopes,
    );

    userData.roles = roles;
    userData.personalScopes = personalScopes;
    userData.storeScopes = firstScopes;
    return userData;
  }
}
