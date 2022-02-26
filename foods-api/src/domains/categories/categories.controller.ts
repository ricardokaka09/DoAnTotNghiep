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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Scopes } from '../../middlewares/authz/authz.service';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  FindManyCategoryDto,
  UpdateCategoryDto,
} from './models/categories.dto';
import { Categories } from './models/categories.schema';
import { FindManyCategoryResult } from './models/categories.interface';
import { scopes } from '../../constants/scopes';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({
    description: `
    To create a category, you have to provide the name field, and the description field is optional
    `,
  })
  @UseGuards(new Scopes([scopes.CREATE_CATEGORY]))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOneCategory(
    @Body() data: CreateCategoryDto,
    @Request() { user },
  ): Promise<Categories> {
    try {
      const newCategory = await this.categoriesService.createOne({
        data,
        credentials: user,
      });
      return newCategory;
    } catch (error) {
      throw error;
    }
  }

  @Put(':categoryID')
  @ApiOperation({
    description: `
    To update information of category, by categoryID`,
  })
  @UseGuards(new Scopes([]))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOneCategory(
    @Body() data: UpdateCategoryDto,
    @Param() { categoryID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const categoryUpdate = await this.categoriesService.updateOne({
        data,
        query: { categoryID },
        credentials: user,
      });
      return categoryUpdate;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':categoryID')
  @ApiOperation({
    description: `
    To delete a category, by categoryID`,
  })
  @UseGuards(AuthGuard('jwt'))
  async deleteOneCategory(
    @Param() { categoryID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const categoryDelete = await this.categoriesService.deleteOne({
        query: { categoryID },
        credentials: user,
      });

      return categoryDelete;
    } catch (error) {
      throw error;
    }
  }

  @Get(':categoryID')
  @ApiOperation({
    description: `
    To find a category, by categoryID`,
  })
  async findOneCategory(
    @Param() { categoryID },
    @Request() { user },
  ): Promise<Categories> {
    try {
      const category = await this.categoriesService.findOne({
        query: { categoryID },
        credentials: user,
        relations: [],
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getList(
    @Request() { user },
    @Query() find: FindManyCategoryDto,
  ): Promise<FindManyCategoryResult> {
    try {
      const listCategory = await this.categoriesService.findMany({
        query: find,
        credentials: user,
      });

      return listCategory;
    } catch (error) {
      throw error;
    }
  }
}
