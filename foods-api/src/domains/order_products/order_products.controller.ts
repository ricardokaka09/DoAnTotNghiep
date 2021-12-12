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
import { ApiTags } from '@nestjs/swagger';
import {
  CreateOrderProductDto,
  FindManyOrderProductDto,
  UpdateOrderProductDto,
} from './models/order_products.dto';
import { FindManyOrderProductResult } from './models/order_products.interface';
import { OrderProducts } from './models/order_products.schema';
import { OrderProductsCombinedService } from './order_products.combined.service';
import { OrderProductsService } from './order_products.service';

@Controller('order-products')
@ApiTags('Order-products')
export class OrderProductsController {
  constructor(
    private readonly orderProductsService: OrderProductsService,
    private readonly orderProductsCombinedService: OrderProductsCombinedService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOneOrder(
    @Body() data: CreateOrderProductDto,
    @Request() { user },
  ): Promise<OrderProducts> {
    try {
      const newOrderProduct =
        await this.orderProductsCombinedService.createOrderProduct({
          data,
          credentials: user,
        });

      return newOrderProduct;
    } catch (error) {
      throw error;
    }
  }

  @Put(':orderProductID')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateQuantity(
    @Body() data: UpdateOrderProductDto,
    @Param() { orderProductID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const orderUpdate =
        await this.orderProductsCombinedService.updateQuantityProductsAndOrderProducts(
          {
            query: { orderProductID },
            quantity: data.quantity,
            credentials: user,
          },
        );
      return orderUpdate;
    } catch (error) {
      throw error;
    }
  }

  @Get(':orderProductID')
  @UseGuards(AuthGuard('jwt'))
  async findOneOrder(
    @Param() { orderProductID },
    @Request() { user },
  ): Promise<OrderProducts> {
    try {
      const order = await this.orderProductsService.findOne({
        query: { orderProductID },
        credentials: user,
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllOrders(
    @Request() { user },
    @Query() find: FindManyOrderProductDto,
  ): Promise<FindManyOrderProductResult> {
    try {
      const listOrder = await this.orderProductsService.findMany({
        query: find,
        credentials: user,
      });
      return listOrder;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':orderProductID')
  @UseGuards(AuthGuard('jwt'))
  async deleteOneOrder(
    @Param() { orderProductID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const deletedOrder = await this.orderProductsService.deleteOne({
        query: { orderProductID },
        credentials: user,
      });

      return deletedOrder;
    } catch (error) {
      throw error;
    }
  }
}
