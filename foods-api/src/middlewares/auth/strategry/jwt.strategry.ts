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
    const userData: any = await this.userService.getCurrentUserCredentials(
      { userID: payload.userID },
      false,
    );

    if (!userData) {
      throw new UnauthorizedException(
        'Email/phone and  password combination are not found',
      );
    }
    return payload;
  }
}
