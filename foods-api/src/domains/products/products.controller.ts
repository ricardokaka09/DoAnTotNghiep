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
import { CategoriesService } from '../categories/categories.service';
import { SubCategoriesService } from '../sub_categories/sub_categories.service';
import {
  CreateProductDto,
  FindManyProductDto,
  UpdateProductDto,
} from './models/products.dto';
import { FindManyProductResult } from './models/products.interface';
import { Products } from './models/products.schema';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly subCategories: SubCategoriesService,
    private readonly categories: CategoriesService,
  ) {}

  @Post()
  @ApiOperation({
    description: `
        To create a product, you have to provide the name field, and anything else is optional
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOneProduct(
    @Body() data: CreateProductDto,
    @Request() { user },
  ): Promise<Products> {
    try {
      const newProduct = await this.productService.createOne({
        data,
        credentials: user,
      });

      if (data.subCategoryID) {
        await this.subCategories.updateTotalProduct(
          data.subCategoryID,
          1,
          'increment',
        );
      }

      if (data.categoryID) {
        await this.categories.updateTotalProduct(
          data.categoryID,
          1,
          'increment',
        );
      }
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  @Put(':productID')
  @ApiOperation({
    description: `
        To update the information of a product, by productID
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOneProduct(
    @Body() data: UpdateProductDto,
    @Param() { productID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const isUpdated = await this.productService.updateOne({
        data,
        query: { productID },
        credentials: user,
      });
      return isUpdated;
    } catch (error) {
      throw error;
    }
  }

  @Get(':productID')
  @ApiOperation({
    description: `
        To find a product, by productID
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  async findOneProduct(
    @Param() { productID },
    @Request() { user },
  ): Promise<Products> {
    try {
      const product = await this.productService.findOne({
        query: { productID },
        credentials: user,
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    description: `
        To find all product, filter some product by name, or filter by price range
        if you want to find all product, just let it empty and set sortBy, setDirection
        if you want to filter some product, type name, set fromPrice and toPrice to search
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  async findAllProduct(
    @Request() { user },
    @Query() find: FindManyProductDto,
  ): Promise<FindManyProductResult> {
    try {
      const listProduct = await this.productService.findMany({
        query: find,
        credentials: user,
      });
      return listProduct;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':productID')
  @ApiOperation({
    description: `
        To delete a product, by productID
        `,
  })
  @UseGuards(AuthGuard('jwt'))
  async deleteOneProduct(
    @Param() { productID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const product = await this.productService.findOne({
        query: { productID },
        credentials: user,
      });

      const deletedProduct = await this.productService.deleteOne({
        query: { productID },
        credentials: user,
      });
      if (product.subCategoryID) {
        await this.subCategories.updateTotalProduct(
          product.subCategoryID,
          1,
          'decrement',
        );
      }

      if (product.categoryID) {
        await this.categories.updateTotalProduct(
          product.categoryID,
          1,
          'decrement',
        );
      }

      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}
