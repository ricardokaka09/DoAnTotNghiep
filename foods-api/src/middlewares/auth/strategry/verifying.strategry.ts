import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../../configs/configs.service';
import { UsersService } from '../../../domains/users/users.service';

@Injectable()
export class VerifyingEmailStrategy extends PassportStrategy(
  Strategy,
  'verifying',
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: configService.jwtVerifyEmailSecret,
    });
  }

  async validate(payload: any) {
    const userData: any = await this.userService.getCurrentUserCredentials(
      { userID: payload.userID },
      true, // get password
    );
    if (!userData) {
      throw new UnauthorizedException(
        'Email/phone and  password combination are not found',
      );
    }
    return payload;
  }
}
