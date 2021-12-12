import { InjectRepository } from '@nestjs/typeorm';
import { NotFound } from '../../shared/assertions';
import { EntityRepository, Repository } from 'typeorm';
import { buildFindingQuery } from '../../helpers/build';
import { OrderProducts } from './models/order_products.schema';
import {
  CreateOneOrderProductService,
  DeleteOneOrderProductService,
  FindManyOrderProductResult,
  FindManyOrderProductService,
  FindOneOrderProductService,
  UpdateOneOrderProductService,
} from './models/order_products.interface';

@EntityRepository(OrderProducts)
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProducts)
    private readonly orderProductsRepository: Repository<OrderProducts>,
  ) {}

  async createOne({
    data,
    credentials,
  }: CreateOneOrderProductService): Promise<OrderProducts> {
    try {
      const payload = {
        ...data,
        createdBy: credentials.userID,
      };

      const newOrderProduct = await this.orderProductsRepository.save(payload);

      return newOrderProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({
    query,
    credentials,
  }: FindOneOrderProductService): Promise<OrderProducts> {
    try {
      const orderProduct = await this.orderProductsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [orderProduct],
        errorName: 'OrderProductNotFound',
      });

      return orderProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManyOrderProductService): Promise<FindManyOrderProductResult> {
    try {
      const { sortBy = 'createdAt', limit, offset } = query;

      const { sortingCondition, findingQuery, hasPage, findAllQuery } =
        buildFindingQuery({
          query: {
            ...query,
            sortBy,
          },
        });

      const promise = [];

      if (hasPage) {
        promise.push(
          this.orderProductsRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.orderProductsRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.orderProductsRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.orderProductsRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [orderProducts, totalCount] = await Promise.all(promise);

      if (!orderProducts || !orderProducts.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: orderProducts,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateQuantity({
    query,
    data,
    credentials,
  }: UpdateOneOrderProductService): Promise<boolean> {
    try {
      const orderProduct = await this.orderProductsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [orderProduct],
        errorName: 'OrderProductNotFound',
      });

      await this.orderProductsRepository.update(
        { orderProductID: orderProduct.orderProductID },
        data,
      );

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteOneOrderProductService): Promise<boolean> {
    try {
      const orderProduct = await this.orderProductsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [orderProduct],
        errorName: 'OrderProductNotFound',
      });

      await this.orderProductsRepository.remove(orderProduct);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
