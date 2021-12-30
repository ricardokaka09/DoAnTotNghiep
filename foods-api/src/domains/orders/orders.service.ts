import { InjectRepository } from '@nestjs/typeorm';
import { buildFindingQuery } from '../../helpers/build';
import { NotFound } from '../../shared/assertions';
import { EntityRepository, Repository } from 'typeorm';
import {
  CreateOneOrderService,
  DeleteOneOrderService,
  FindManyOrderResult,
  FindManyOrderService,
  FindOneOrderService,
  UpdateOneOrderService,
} from './models/orders.interface';
import { Orders } from './models/orders.schema';

@EntityRepository(Orders)
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async createOne({
    data,
    credentials,
  }: CreateOneOrderService): Promise<Orders> {
    try {
      const payload = {
        ...data,
        createdBy: credentials.userID,
      };
      const newOrder = await this.ordersRepository.save(payload);

      return newOrder;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneOrderService): Promise<Orders> {
    try {
      const order = await this.ordersRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [order],
        errorName: 'OrderNotFound',
      });

      const orderUpdated = await this.ordersRepository.update(
        { orderID: order.orderID },
        data,
      );

      return {
        ...order,
        ...data,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query, credentials }: FindOneOrderService): Promise<Orders> {
    try {
      const order = await this.ordersRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [order],
        errorName: 'OrderNotFound',
      });

      return order;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async checkExistOrder({
    query,
    needToThrowError = true,
    credentials,
  }: any): Promise<Orders> {
    try {
      const order = await this.ordersRepository.findOne({
        where: query,
      });

      return order;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManyOrderService): Promise<FindManyOrderResult> {
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
          this.ordersRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.ordersRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.ordersRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.ordersRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [orders, totalCount] = await Promise.all(promise);

      if (!orders || !orders.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: orders,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteOneOrderService): Promise<boolean> {
    try {
      const order = await this.ordersRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [order],
        errorName: 'OrderNotFound',
      });

      await this.ordersRepository.remove(order);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
