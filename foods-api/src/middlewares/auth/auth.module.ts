import { Module } from '@nestjs/common';
import { ConfigModule } from '../../configs/configs.module';
import { UsersModule } from '../../domains/users/users.module';
import { JwtStrategy } from './strategry/jwt.strategry';
import { LocalPasswordStrategy } from './strategry/local.strategry';
import { VerifyingEmailStrategy } from './strategry/verifying.strategry';

@Module({
  imports: [UsersModule, ConfigModule],
  providers: [LocalPasswordStrategy, VerifyingEmailStrategy, JwtStrategy],
})
export class AuthModule {}
