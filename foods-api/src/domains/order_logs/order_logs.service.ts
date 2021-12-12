import { InjectRepository } from '@nestjs/typeorm';
import { buildFindingQuery } from '../../helpers/build';
import { NotFound } from '../../shared/assertions';
import { EntityRepository, Repository } from 'typeorm';
import {
  CreateOneOrderLogService,
  DeleteOneOrderLogService,
  FindManyOrderLogResult,
  FindManyOrderLogService,
  FindOneOrderLogService,
  UpdateOneOrderLogService,
} from './models/order_logs.interface';
import { OrderLogs } from './models/order_logs.schema';

@EntityRepository(OrderLogs)
export class OrderLogsService {
  constructor(
    @InjectRepository(OrderLogs)
    private readonly orderLogRepository: Repository<OrderLogs>,
  ) {}

  async createOne({
    data,
    credentials,
  }: CreateOneOrderLogService): Promise<OrderLogs> {
    try {
      const payload = {
        ...data,
        createdBy: credentials.userID,
      };

      const newOrderLog = await this.orderLogRepository.save(payload);

      return newOrderLog;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneOrderLogService): Promise<boolean> {
    try {
      const orderLog = await this.orderLogRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [orderLog],
        errorName: 'OrderLogNotFound',
      });

      await this.orderLogRepository.update(
        {
          orderLogID: orderLog.orderLogID,
        },
        data,
      );

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({
    query,
    credentials,
  }: FindOneOrderLogService): Promise<OrderLogs> {
    try {
      const orderLog = await this.orderLogRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [orderLog],
        errorName: 'OrderLogNotFound',
      });

      return orderLog;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManyOrderLogService): Promise<FindManyOrderLogResult> {
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
          this.orderLogRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.orderLogRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.orderLogRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.orderLogRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [orderLogs, totalCount] = await Promise.all(promise);

      if (!orderLogs || !orderLogs.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: orderLogs,
      };
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteOneOrderLogService): Promise<boolean> {
    try {
      const orderLog = await this.orderLogRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [orderLog],
        errorName: 'OrderLogNotFound',
      });

      await this.orderLogRepository.remove(orderLog);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
