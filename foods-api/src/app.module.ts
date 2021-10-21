import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/configs.module';
import { DatabaseModule } from './database/database.module';
import { StoresModule } from './domains/stores/stores.module';
import { UsersModule } from './domains/users/users.module';
import { UserAccessesModule } from './domains/user_accesses/user_accesses.module';
import { AuthModule } from './middlewares/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UsersModule,
    AuthModule,
    UserAccessesModule,
    StoresModule,
  ],
})
export class AppModule {}
