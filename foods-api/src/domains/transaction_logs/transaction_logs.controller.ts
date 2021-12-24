import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FindManyTransactionLogs } from './models/transaction_logs.dto';
import { FindManyTransactionLogsResult } from './models/transaction_logs.interface';
import { TransactionLogs } from './models/transaction_logs.schema';
import { TransactionLogsService } from './transaction_logs.service';

@Controller('transactionLogs')
@ApiTags('TransactionLogs')
export class TransactionLogsController {
  constructor(
    private readonly transactionLogsService: TransactionLogsService,
  ) {}

  @Get(':transactionLogID')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findOne(
    @Request() { user },
    @Param() { transactionLogID },
  ): Promise<TransactionLogs> {
    try {
      const transactionLog = await this.transactionLogsService.findOne({
        query: { transactionLogID },
        credentials: user,
      });

      return transactionLog;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(
    @Request() { user },
    @Query() find: FindManyTransactionLogs,
  ): Promise<FindManyTransactionLogsResult> {
    try {
      const transactionLog = await this.transactionLogsService.findMany({
        query: find,
        credentials: user,
      });

      return transactionLog;
    } catch (error) {
      throw error;
    }
  }
}
