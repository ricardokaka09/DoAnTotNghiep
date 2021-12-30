import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLogsModule } from '../order_logs/order_logs.module';
import { OrderLogsService } from '../order_logs/order_logs.service';
import { OrderProducts } from '../order_products/models/order_products.schema';
import { OrderProductsModule } from '../order_products/order_products.module';
import { Products } from '../products/models/products.schema';
import { ProductsService } from '../products/products.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { Orders } from './models/orders.schema';
import { OrderCombinedService } from './orders.combined.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

const OrdersRepository = TypeOrmModule.forFeature([Orders]);
const ProductsRepository = TypeOrmModule.forFeature([Products]);
const OrderProductsRepository = TypeOrmModule.forFeature([OrderProducts]);

@Module({
  imports: [
    OrdersRepository,
    ProductsRepository,
    OrderProductsRepository,
    forwardRef(() => OrderProductsModule),
    forwardRef(() => OrderLogsModule),
    forwardRef(() => TransactionsModule),
    TransactionsModule,
  ],
  controllers: [OrdersController],
  exports: [OrdersService, OrdersRepository],
  providers: [
    OrdersService,
    OrderCombinedService,
    ProductsService,
    OrderLogsService,
  ],
})
export class OrderModule {}
