import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { RatingModule } from '../ratings/ratings.module';
import { SubCategoriesModule } from '../sub_categories/sub_categories.module';
import { ProductCombineService } from './models/products.combine.service';
import { Products } from './models/products.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const ProductsRepository = TypeOrmModule.forFeature([Products]);

@Module({
  imports: [
    ProductsRepository,
    SubCategoriesModule,
    CategoriesModule,
    RatingModule,
  ],
  controllers: [ProductsController],
  exports: [ProductsService, ProductsRepository],
  providers: [ProductsService, ProductCombineService],
})
export class ProductsModule {}
