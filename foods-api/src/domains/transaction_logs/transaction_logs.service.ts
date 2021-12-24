import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateOneTransactionLogsService,
  DeleteOneTransactionLogsService,
  FindManyTransactionLogsResult,
  FindManyTransactionLogsService,
  FindOneTransactionLogsService,
  UpdateOneTransactionLogsService,
} from './models/transaction_logs.interface';
import { TransactionLogs } from './models/transaction_logs.schema';
import { NotFound } from '../../shared/assertions';
import { buildFindingQuery } from '../../helpers/build';

@Injectable()
export class TransactionLogsService {
  constructor(
    @InjectRepository(TransactionLogs)
    private readonly transactionLogsRepository: Repository<TransactionLogs>,
  ) {}

  async createOne({
    transactionLogData,
    credentials,
  }: CreateOneTransactionLogsService): Promise<TransactionLogs> {
    try {
      const payload = {
        ...transactionLogData,
        createdBy: credentials.userID,
      };

      const transactionLog = await this.transactionLogsRepository.save(payload);

      return transactionLog;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({
    query,
    credentials,
  }: FindOneTransactionLogsService): Promise<TransactionLogs> {
    try {
      const transactionLog = await this.transactionLogsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [transactionLog],
        errorName: 'TransactionLogsNotFound',
      });

      return transactionLog;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManyTransactionLogsService): Promise<FindManyTransactionLogsResult> {
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
          this.transactionLogsRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.transactionLogsRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.transactionLogsRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.transactionLogsRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [transactionLog, totalCount] = await Promise.all(promise);

      if (!transactionLog || !transactionLog.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: transactionLog,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneTransactionLogsService): Promise<boolean> {
    try {
      const transactionLog = await this.transactionLogsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [transactionLog],
        errorName: 'TransactionLogsNotFound',
      });

      await this.transactionLogsRepository.update(
        { transactionID: transactionLog.transactionLogID },
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
  }: DeleteOneTransactionLogsService): Promise<boolean> {
    try {
      const transactionLog = await this.transactionLogsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [transactionLog],
        errorName: 'TransactionLogsNotFound',
      });

      await this.transactionLogsRepository.remove(transactionLog);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
