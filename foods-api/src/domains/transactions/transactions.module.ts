import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../orders/orders.module';
import { TransactionLogsModule } from '../transaction_logs/transaction_logs.module';
import { Transactions } from './models/transactions.schema';
import { TransactionCombinedService } from './transactions.combined.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

const TransactionRepository = TypeOrmModule.forFeature([Transactions]);
@Module({
  imports: [
    TransactionRepository,
    TransactionLogsModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionCombinedService],
  exports: [
    TransactionsService,
    TransactionRepository,
    TransactionCombinedService,
  ],
})
export class TransactionsModule {}
