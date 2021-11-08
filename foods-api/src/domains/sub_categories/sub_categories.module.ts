import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategories } from './models/sub_categories.schema';
import { SubCategoriesController } from './sub_categories.controller';
import { SubCategoriesService } from './sub_categories.service';

const SubCategoryRepository = TypeOrmModule.forFeature([SubCategories]);
@Module({
  imports: [SubCategoryRepository],
  controllers: [SubCategoriesController],
  exports: [SubCategoriesService, SubCategoryRepository],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
