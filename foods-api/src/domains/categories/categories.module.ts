import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories } from './models/categories.schema';

const CategoriesRepository = TypeOrmModule.forFeature([Categories]);

@Module({
  imports: [CategoriesRepository],
  controllers: [CategoriesController],
  exports: [CategoriesService, CategoriesRepository],
  providers: [CategoriesService],
})
export class CategoriesModule {}
