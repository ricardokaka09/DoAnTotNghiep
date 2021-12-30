import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from './models/transactions.schema';
import { NotFound } from '../../shared/assertions';
import { buildFindingQuery } from '../../helpers/build';
import {
  CreateOneTransactionsService,
  DeleteOneTransactionService,
  FindManyTransactionsService,
  FindManyTransactionsServiceResult,
  FindOneTransactionsService,
  UpdateOneTransactionsService,
} from './models/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
  ) {}

  async findOne({
    query,
    credentials,
  }: FindOneTransactionsService): Promise<Transactions> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [transaction],
        errorName: 'TransactionNotFound',
      });

      return transaction;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
    relations = [],
  }: FindManyTransactionsService): Promise<FindManyTransactionsServiceResult> {
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
          this.transactionRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
            relations,
          }),
          this.transactionRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.transactionRepository.find({
            where: findAllQuery,
            order: sortingCondition,
            relations,
          }),
          this.transactionRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [transactions, totalCount] = await Promise.all(promise);

      if (!transactions || !transactions.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: transactions,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({
    data,
    credentials,
  }: CreateOneTransactionsService): Promise<Transactions> {
    try {
      const payload = {
        ...data,
        createdBy: credentials.userID,
      };

      const transaction = await this.transactionRepository.save(payload);

      return transaction;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneTransactionsService): Promise<Transactions> {
    try {
      const transactions = await this.transactionRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [transactions],
        errorName: 'TransactionNotFound',
      });

      await this.transactionRepository.update(
        { transactionID: transactions.transactionID },
        data,
      );

      const updateTransaction = {
        ...transactions,
        ...data,
      };
      return updateTransaction;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteOneTransactionService): Promise<boolean> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [transaction],
        errorName: 'TransactionNotFound',
      });

      await this.transactionRepository.remove(transaction);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async checkExistTransaction({
    query,
    needToThrowError = true,
    credentials,
  }: any): Promise<Transactions> {
    try {
      const orderID = query.orderID;
      const status = query.status;
      const transaction = await this.findMany({
        query: {
          orderID,
          status,
        },
        credentials,
      });

      NotFound.isFalsy({
        and: [transaction, needToThrowError],
        errorName: 'TransactionNotFound',
      });

      return transaction.list[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
