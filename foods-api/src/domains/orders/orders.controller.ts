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
  CreateOrderDto,
  FindManyOrderDto,
  UpdateOrderDto,
} from './models/orders.dto';
import { FindManyOrderResult } from './models/orders.interface';
import { Orders } from './models/orders.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOneOrder(
    @Body() data: CreateOrderDto,
    @Request() { user },
  ): Promise<Orders> {
    try {
      const newOrder = await this.orderService.createOne({
        data,
        credentials: user,
      });

      return newOrder;
    } catch (error) {
      throw error;
    }
  }

  @Put(':orderID')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOneOrder(
    @Body() data: UpdateOrderDto,
    @Param() { orderID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const orderUpdate = await this.orderService.updateOne({
        data,
        query: { orderID },
        credentials: user,
      });
      return orderUpdate;
    } catch (error) {
      throw error;
    }
  }

  @Get(':orderID')
  @UseGuards(AuthGuard('jwt'))
  async findOneOrder(
    @Param() { orderID },
    @Request() { user },
  ): Promise<Orders> {
    try {
      const order = await this.orderService.findOne({
        query: { orderID },
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
    @Query() find: FindManyOrderDto,
  ): Promise<FindManyOrderResult> {
    try {
      const listOrder = await this.orderService.findMany({
        query: find,
        credentials: user,
      });
      return listOrder;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':orderID')
  @UseGuards(AuthGuard('jwt'))
  async deleteOneOrder(
    @Param() { orderID },
    @Request() { user },
  ): Promise<boolean> {
    try {
      const deletedOrder = await this.orderService.deleteOne({
        query: { orderID },
        credentials: user,
      });

      return deletedOrder;
    } catch (error) {
      throw error;
    }
  }
}
