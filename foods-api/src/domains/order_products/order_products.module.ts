import { Module } from '@nestjs/common'
import { OrderProductsService } from './order_products.service'
import { OrderProductsController } from './order_products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderProducts } from './models/order_products.schema'
import { OrderProductsCombinedService } from './order_products.combined.service'
import { Products } from '../products/models/products.schema'
import { ProductsService } from '../products/products.service'
import { ProductsModule } from '../products/products.module'
import { OrdersService } from '../orders/orders.service'
import { Orders } from '../orders/models/orders.schema'

const OrderProductsRepository = TypeOrmModule.forFeature([OrderProducts])
const ProductsRepository = TypeOrmModule.forFeature([Products])
const OrdersRepository = TypeOrmModule.forFeature([Orders])
@Module({
  imports: [
    OrderProductsRepository,
    ProductsRepository,
    OrdersRepository,
    ProductsModule,
  ],
  providers: [
    OrderProductsService,
    OrderProductsCombinedService,
    ProductsService,
    OrdersService,
  ],
  exports: [
    OrderProductsService,
    ProductsService,
    OrderProductsCombinedService,
    OrdersService,
    OrderProductsRepository,
    ProductsRepository,
    OrdersRepository,
  ],
  controllers: [OrderProductsController],
})
export class OrderProductsModule { }
