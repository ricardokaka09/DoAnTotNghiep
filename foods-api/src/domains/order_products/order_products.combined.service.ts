import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import {
  CreateOneOrderProductService,
  DeleteOneOrderProductService,
  UpdateQuantityOrderProductService,
} from './models/order_products.interface';
import { OrderProductsService } from './order_products.service';

@Injectable()
export class OrderProductsCombinedService {
  constructor(
    private readonly orderProductsService: OrderProductsService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async createOrderProduct({
    data,
    credentials,
  }: CreateOneOrderProductService): Promise<any> {
    try {
      const { productID, quantity } = data;
      const product = await this.productsService.findOne({
        query: { productID },
        credentials,
      });
      const { storeID } = product;

      const { list } = await this.ordersService.findMany({
        query: { storeID },
        credentials: { isAdmin: true },
      });
      let order;
      if (storeID === list[0]?.storeID) {
        order = await this.ordersService.updateOne({
          query: { orderID: list[0].orderID },
          data: {
            totalAmount: list[0].totalAmount + product.price * quantity,
          },
          credentials,
        });
      } else {
        order = await this.ordersService.createOne({
          data: {
            name: 'order',
            userID: credentials.userID,
            storeID,
            totalAmount: product.price * quantity,
          },
          credentials,
        });
      }
      const payload = {
        ...data,
        price: product.price,
        name: product.name,
        createdBy: credentials.userID,
        userID: credentials.userID,
        storeID,
        orderID: order.orderID,
      };

      const [newOrderProduct] = await Promise.all([
        this.orderProductsService.createOne({
          data: payload,
          credentials,
        }),
        this.productsService.updateOne({
          query: { productID },
          credentials,
          data: { quantity: product.quantity - data.quantity },
        }),
      ]);

      return { newOrderProduct, order };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateQuantityProductsAndOrderProducts({
    query,
    quantity,
    credentials,
  }: UpdateQuantityOrderProductService) {
    try {
      const orderProduct = await this.orderProductsService.findOne({
        query,
        credentials,
      });
      const product = await this.productsService.findOne({
        query: { productID: orderProduct.productID },
        credentials: { isAdmin: true },
      });

      await Promise.all([
        this.orderProductsService.updateQuantity({
          query,
          credentials,
          data: { quantity },
        }),
        this.productsService.updateOne({
          query: { productID: orderProduct.productID },
          credentials,
          data: {
            quantity: product.quantity - quantity + orderProduct.quantity,
          },
        }),
      ]);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteOrderProducts({
    query,
    credentials,
  }: DeleteOneOrderProductService) {
    try {
      const orderProduct = await this.orderProductsService.findOne({
        query,
        credentials,
      });
      const product = await this.productsService.findOne({
        query: { productID: orderProduct.productID },
        credentials,
      });
      const order = await this.ordersService.findOne({
        query: { orderID: orderProduct.orderID },
        credentials,
      });

      await Promise.all([
        this.orderProductsService.deleteOne({
          query,
          credentials,
        }),
        this.productsService.updateOne({
          query: { productID: orderProduct.productID },
          credentials,
          data: {
            quantity: product.quantity + orderProduct.quantity,
          },
        }),
        this.ordersService.updateOne({
          query: { orderID: orderProduct.orderID },
          data: {
            totalAmount:
              order.totalAmount - orderProduct.quantity * product.price,
          },
          credentials: {},
        }),
      ]);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
