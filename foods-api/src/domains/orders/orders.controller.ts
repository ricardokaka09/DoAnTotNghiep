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
import { Transactions } from '../transactions/models/transactions.schema';
import { TypeTransactionEnum } from './models/enum';
import {
  AcceptTransactionsServiceDto,
  CheckoutOrder,
  CreateOrderDto,
  DenyTransactionsServiceDto,
  FindManyOrderDto,
  UpdateOrderDto,
} from './models/orders.dto';
import { FindManyOrderResult } from './models/orders.interface';
import { Orders } from './models/orders.schema';
import { OrderCombinedService } from './orders.combined.service';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService,
    private readonly orderCombinedService: OrderCombinedService,
  ) {}

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
  ): Promise<Orders> {
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
  @Post('/:orderID/checkout')
  @UseGuards(AuthGuard('jwt'))
  async checkoutOrder(
    @Request() { user },
    @Param() { orderID },
    @Query() typeTransaction: CheckoutOrder,
  ): Promise<Transactions> {
    try {
      let transactions;
      switch (typeTransaction.typeTransaction) {
        case TypeTransactionEnum.CASH:
          transactions = await this.orderCombinedService.checkoutOrderByCash({
            query: { orderID },
            credentials: user,
          });
          break;
        case TypeTransactionEnum.DIGITAL:
        //
      }
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:orderID/checkout/accept')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async acceptTransactions(
    @Request() { user },
    @Param() { orderID },
    @Body() data: AcceptTransactionsServiceDto,
  ): Promise<boolean> {
    try {
      const transactions = await this.orderCombinedService.acceptTransactions({
        query: { orderID },
        data,
        credentials: user,
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:orderID/checkout/schedule')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async scheduleOrder(
    @Request() { user },
    @Param() { orderID },
    @Body() time: any,
  ): Promise<boolean> {
    try {
      const scheduleOrder = await this.orderCombinedService.scheduleOrder({
        query: { orderID },
        data: time,
        credentials: user,
      });

      const orders = await this.orderService.findOne({
        query: orderID,
        credentials: user,
      });
      // this.notificationCombinedService.createAndPushNotification({
      //   body: {
      //     title: 'Schedule time for delivery',
      //     content: orders.receiveAt,
      //     targetID: orders.userID,
      //     userID: orders.createdBy,
      //   },
      //   user,
      // });
      return scheduleOrder;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:orderID/checkout/cancel')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async deniedTransactions(
    @Request() { user },
    @Param() { orderID },
    @Body() data: DenyTransactionsServiceDto,
  ): Promise<boolean> {
    try {
      const transactions = await this.orderCombinedService.canceledTransactions(
        {
          query: { orderID },
          data,
          credentials: user,
        },
      );

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:orderID/checkout/complete')
  @UseGuards(AuthGuard('jwt'))
  async completedTransactions(
    @Request() { user },
    @Param() { transactionID },
  ): Promise<boolean> {
    try {
      const transactions = await this.orderCombinedService.completeTransactions(
        {
          query: { transactionID },
          credentials: user,
        },
      );

      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
