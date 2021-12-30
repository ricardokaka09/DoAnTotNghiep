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
  CreateTransactionsDto,
  UpdateTransactionsDto,
} from './models/transactions.dto';
import { FindManyTransactionsServiceResult } from './models/transactions.interface';
import { Transactions } from './models/transactions.schema';
import { TransactionCombinedService } from './transactions.combined.service';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionsCombinedService: TransactionCombinedService,
  ) {}

  @Get(':transactionID')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findOne(
    @Request() { user },
    @Param() { transactionID },
  ): Promise<Transactions> {
    try {
      const transactions = await this.transactionsService.findOne({
        query: { transactionID },
        credentials: user,
      });

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(
    @Request() { user },
    @Query() find,
  ): Promise<FindManyTransactionsServiceResult> {
    try {
      const transactions = await this.transactionsService.findMany({
        query: find,
        credentials: user,
      });

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() data: CreateTransactionsDto,
  ): Promise<Transactions> {
    try {
      const transactions =
        await this.transactionsCombinedService.createTransactionAndLog({
          data,
          credentials: user,
        });

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:transactionID')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Request() { user },
    @Body() data: UpdateTransactionsDto,
    @Param() { transactionID },
  ): Promise<any> {
    try {
      const transactionUpdate =
        await this.transactionsCombinedService.updateTransactionAndLog({
          query: { transactionID },
          data,
          credentials: user,
        });
      return transactionUpdate;
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:transactionID')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(
    @Request() { user },
    @Param() { transactionID },
  ): Promise<boolean> {
    try {
      const transactions = await this.transactionsService.deleteOne({
        query: { transactionID },
        credentials: user,
      });

      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
