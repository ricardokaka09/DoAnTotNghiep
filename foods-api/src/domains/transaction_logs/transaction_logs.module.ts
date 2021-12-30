import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionLogs } from './models/transaction_logs.schema';
import { TransactionLogsController } from './transaction_logs.controller';
import { TransactionLogsService } from './transaction_logs.service';

const TransactionLogsRepository = TypeOrmModule.forFeature([TransactionLogs]);
@Module({
  imports: [TransactionLogsRepository],
  controllers: [TransactionLogsController],
  providers: [TransactionLogsService],
  exports: [TransactionLogsRepository, TransactionLogsService],
})
export class TransactionLogsModule {}
