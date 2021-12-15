import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindManyCategoryDto } from '../categories/models/categories.dto';
import { FindManySubCategoryResult } from '../sub_categories/models/sub_categories.interface';
import {
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from './models/sub_categories.dto';
import { SubCategories } from './models/sub_categories.schema';
import { SubCategoriesService } from './sub_categories.service';

@Controller('sub-categories')
@ApiTags('SubCategories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  @ApiOperation({
    description: `
        To create a sub-category, you have to provide the name field and the categoryID field, the description field is optional
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOneSubCategory(
    @Body() data: CreateSubCategoryDto,
    @Request() { user },
  ): Promise<SubCategories> {
    try {
      const newSubCategory = await this.subCategoriesService.createOne({
        data,
        credentials: user,
      });
      return newSubCategory;
    } catch (error) {
      throw error;
    }
  }

  @Put(':subCategoryID')
  @ApiOperation({
    description: `
        To update or change information of a sub-category, by subCateforyID
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOneSubCategory(
    @Body() data: UpdateSubCategoryDto,
    @Param() { subCategoryID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const subCategoryUpdate = await this.subCategoriesService.updateOne({
        data,
        query: { subCategoryID },
        credentials: user,
      });
      return subCategoryUpdate;
    } catch (error) {
      throw error;
    }
  }

  @Get(':subCategoryID')
  @ApiOperation({
    description: `
        To find a subCategory, by subCategoryID`,
  })
  async findOneSubCategory(
    @Param() { subCategoryID },
    @Request() { user },
  ): Promise<SubCategories> {
    try {
      const subCategory = await this.subCategoriesService.findOne({
        query: { subCategoryID },
        credentials: user,
      });
      return subCategory;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAllSubCategory(
    @Request() { user },
    @Query() find: FindManyCategoryDto,
  ): Promise<FindManySubCategoryResult> {
    try {
      const listSubCategory = await this.subCategoriesService.findMany({
        query: find,
        credentials: user,
      });
      return listSubCategory;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':subCategoryID')
  @UseGuards(AuthGuard('jwt'))
  async deleteOneSubCategory(
    @Param() { subCategoryID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const subCategoryDelete = await this.subCategoriesService.deleteOne({
        query: { subCategoryID },
        credentials: user,
      });

      return subCategoryDelete;
    } catch (error) {
      throw error;
    }
  }
}
