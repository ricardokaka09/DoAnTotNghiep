import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/configs.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './domains/categories/categories.module';
import { ProductsModule } from './domains/products/products.module';
import { StoresModule } from './domains/stores/stores.module';
import { SubCategoriesModule } from './domains/sub_categories/sub_categories.module';
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
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
})
export class AppModule {}
