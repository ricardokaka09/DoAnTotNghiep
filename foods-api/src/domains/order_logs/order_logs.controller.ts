import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOrderLogDto } from './models/order_logs.dto';
import { FindManyOrderLogResult } from './models/order_logs.interface';
import { OrderLogs } from './models/order_logs.schema';
import { OrderLogsService } from './order_logs.service';

@Controller('orderLogs')
@ApiTags('OrderLogs')
export class OrderLogsController {
  constructor(private readonly orderLogService: OrderLogsService) {}

  @Get(':orderLogID')
  @UseGuards(AuthGuard('jwt'))
  async findOneOrderLog(
    @Param() { orderLogID },
    @Request() { user },
  ): Promise<OrderLogs> {
    try {
      const orderLog = await this.orderLogService.findOne({
        query: { orderLogID },
        credentials: user,
      });

      return orderLog;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllOrderLog(
    @Request() { user },
    @Query() find: FindManyOrderLogDto,
  ): Promise<FindManyOrderLogResult> {
    try {
      const listOrderLog = await this.orderLogService.findMany({
        query: find,
        credentials: user,
      });

      return listOrderLog;
    } catch (error) {
      throw error;
    }
  }
}
