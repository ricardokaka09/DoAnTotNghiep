import { Injectable } from '@nestjs/common';
import { BadRequest } from '../../shared/assertions';
import { OrdersService } from '../orders/orders.service';
import { EventTypeOrderLogs } from '../order_logs/enum/types';
import { OrderLogsService } from '../order_logs/order_logs.service';
import { StatusTransactions } from '../transactions/enums/types';
import { Transactions } from '../transactions/models/transactions.schema';
import { TransactionCombinedService } from '../transactions/transactions.combined.service';
import { TransactionsService } from '../transactions/transactions.service';
import { OrderStatuses } from './models/orders.schema';

@Injectable()
export class OrderCombinedService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderLogsService: OrderLogsService,
    private readonly transactionsService: TransactionsService,
    private readonly transactionsCombinedService: TransactionCombinedService,
  ) {}
  async checkoutOrderByCash({ query, credentials }): Promise<Transactions> {
    try {
      const order = await this.ordersService.findOne({
        query,
        credentials,
      });

      BadRequest.isFalsy({
        and: [order.status !== OrderStatuses.PENDING],
        errorName: 'OrderDoesNotMatch',
      });

      const { storeID, orderID, userID, totalAmount } = order;

      const existedTransaction =
        await this.transactionsService.checkExistTransaction({
          query: {
            orderID,
            status: StatusTransactions.PENDING,
          },
          needToThrowError: false,
          credentials,
        });

      let transactions;
      if (!existedTransaction) {
        [, transactions] = await Promise.all([
          this.updateOrderAndLog({
            query,
            updateOneData: { status: OrderStatuses.PROCESSING },
            credentials,
          }),
          this.transactionsCombinedService.createTransactionAndLog({
            data: {
              storeID,
              userID,
              orderID,
              amount: totalAmount, // store update manualFee after store confirm transaction
              originAmount: totalAmount,
              type: 'CASH',
              status: StatusTransactions.PENDING,
              deniedReason: '',
              memo: '',
              note: '',
            },
            credentials,
          }),
        ]);
      }
      return transactions;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async acceptTransactions({ query, data, credentials }): Promise<boolean> {
    try {
      const { manualFee } = data;
      const transactions = await this.transactionsService.findOne({
        query,
        credentials,
      });

      BadRequest.isFalsy({
        and: [transactions.status !== StatusTransactions.PENDING],
        errorName: 'TransactionDoesNotMatch',
      });

      const { originAmount, orderID, fixedFee, percentFee } = transactions;

      const fee: number =
        Number(fixedFee) + percentFee * originAmount + manualFee;

      const amount = fee ? originAmount + fee : originAmount;

      await Promise.all([
        this.transactionsCombinedService.updateTransactionAndLog({
          query,
          data: { status: StatusTransactions.CUSTOMER_ACCEPTED, amount },
          credentials,
        }),
        this.updateOrderAndLog({
          query: { orderID },
          updateOneData: { status: OrderStatuses.ACCEPTED },
          credentials,
        }),
      ]);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async scheduleOrder({ query, data, credentials }): Promise<boolean> {
    try {
      await this.updateOrderAndLog({
        query,
        updateOneData: data,
        credentials,
      });
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async canceledTransactions({ query, data, credentials }): Promise<boolean> {
    try {
      const { deniedReason } = data;
      const transactions = await this.transactionsService.findOne({
        query,
        credentials,
      });

      console.log(' transaction', transactions);
      BadRequest.isFalsy({
        and: [transactions.status !== StatusTransactions.PENDING],
        errorName: 'TransactionDoesNotMatch',
      });

      const { orderID } = transactions;

      await Promise.all([
        this.transactionsCombinedService.updateTransactionAndLog({
          query,
          data: { status: StatusTransactions.CUSTOMER_CANCELED, deniedReason },
          credentials,
        }),
        this.updateOrderAndLog({
          query: { orderID },
          updateOneData: { status: OrderStatuses.CANCELED },
          credentials,
        }),
      ]);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async completeTransactions({ query, credentials }): Promise<boolean> {
    try {
      const transactions = await this.transactionsService.findOne({
        query,
        credentials,
      });

      BadRequest.isFalsy({
        and: [transactions.status !== StatusTransactions.PROCESSING],
        errorName: 'TransactionDoesNotMatch',
      });

      const { orderID, type } = transactions;

      switch (type) {
        case 'CASH': {
          await Promise.all([
            this.transactionsCombinedService.updateTransactionAndLog({
              query,
              data: { status: StatusTransactions.FINISHED },
              credentials,
            }),
            this.updateOrderAndLog({
              query: { orderID },
              updateOneData: { status: OrderStatuses.COMPLETED },
              credentials,
            }),
          ]);
          break;
        }

        case 'DIGITAL': {
          //
        }
      }

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOrderAndLog({
    query,
    updateOneData,
    credentials,
  }): Promise<boolean> {
    try {
      const orders = await this.ordersService.updateOne({
        query,
        data: updateOneData,
        credentials,
      });

      const orderLogData = {
        name: orders.name,
        orderID: orders.orderID,
        storeID: orders.storeID,
        userID: orders.userID,
        description: orders.description,
        totalAmount: orders.totalAmount,
        originalAmount: orders.originalAmount,
        discount: orders.discount,
        fee: orders.fee,
        type: orders.type,
        status: orders.status,
        event: EventTypeOrderLogs.UPDATED_ORDER_PRODUCT,
      };
      await this.orderLogsService.createOne({
        data: orderLogData,
        credentials,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
