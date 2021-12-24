import { Injectable } from '@nestjs/common';
import { EventsTransactionLogs } from '../transaction_logs/enums/types';
import { TransactionLogsService } from '../transaction_logs/transaction_logs.service';
import { TransactionsService } from './transactions.service';

@Injectable()
export class TransactionCombinedService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionLogsService: TransactionLogsService,
  ) {}

  async createTransactionAndLog({ data, credentials }) {
    try {
      const transaction = await this.transactionsService.createOne({
        data,
        credentials,
      });

      const transactionLogData = {
        storeID: transaction.storeID,
        userID: transaction.userID,
        orderID: transaction.orderID,
        amount: transaction.amount,
        fee: transaction.fee,
        status: transaction.status,
        deniedReason: transaction.deniedReason,
        event: EventsTransactionLogs.TRANSACTIONS_CREATED,
        note: transaction.note,
        type: transaction.type,
        data: null,
        transactionID: transaction.transactionID,
      };

      this.transactionLogsService.createOne({
        transactionLogData,
        credentials,
      });

      return transaction;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateTransactionAndLog({
    query,
    data,
    credentials,
  }): Promise<boolean> {
    try {
      const transactions = await this.transactionsService.updateOne({
        query,
        data,
        credentials,
      });

      const transactionLogData = {
        storeID: transactions.storeID,
        userID: transactions.userID,
        orderID: transactions.orderID,
        amount: transactions.amount,
        originAmount: transactions.originAmount,
        fee: transactions.fee,
        status: transactions.status,
        deniedReason: transactions.deniedReason,
        event: EventsTransactionLogs.TRANSACTIONS_UPDATED,
        note: transactions.note,
        type: transactions.type,
        data: null,
        transactionID: transactions.transactionID,
      };

      this.transactionLogsService.createOne({
        transactionLogData,
        credentials,
      });

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
