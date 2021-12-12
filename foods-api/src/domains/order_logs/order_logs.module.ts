import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLogs } from './models/order_logs.schema';
import { OrderLogsController } from './order_logs.controller';
import { OrderLogsService } from './order_logs.service';

const OrderLogRepository = TypeOrmModule.forFeature([OrderLogs]);
@Module({
  imports: [OrderLogRepository],
  controllers: [OrderLogsController],
  exports: [OrderLogRepository, OrderLogsService],
  providers: [OrderLogsService],
})
export class OrderLogsModule {}
