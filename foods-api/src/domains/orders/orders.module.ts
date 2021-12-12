import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './models/orders.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

const OrdersRepository = TypeOrmModule.forFeature([Orders]);

@Module({
  imports: [OrdersRepository],
  controllers: [OrdersController],
  exports: [OrdersService, OrdersRepository],
  providers: [OrdersService],
})
export class OrderModule {}
