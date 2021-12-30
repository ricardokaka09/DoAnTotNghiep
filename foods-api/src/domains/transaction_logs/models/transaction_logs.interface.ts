import { TransactionLogs } from './transaction_logs.schema';

interface CreateOneData {
  storeID?: string;
  userID: string;
  orderID?: string;
  amount: number;
  fee?: number;
  status: string;
  deniedReason?: string;
  event: string;
  note?: string;
  type: string;
  data?: string;
  transactionID: string;
}

interface UpdateOneData {
  amount?: number;
  fee?: number;
  status?: string;
  deniedReason?: string;
  type?: string;
  note?: string;
  data?: string;
  event?: string;
}

interface FindOneQuery {
  transactionLogID: string;
}

interface FindManyQuery {
  transactionLogID?: string;
  storeID?: string;
  userID?: string;
  orderID?: string;
  amount?: number;
  status?: string;
  deniedReason?: string;
  type?: string;
  note?: string;
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface CreateOneTransactionLogsService {
  transactionLogData: CreateOneData;
  credentials: any;
}

export interface FindOneTransactionLogsService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManyTransactionLogsService {
  query: FindManyQuery;
  credentials: any;
}

export interface FindManyTransactionLogsResult {
  totalCount: number;
  list: TransactionLogs[];
}

export interface UpdateOneTransactionLogsService {
  query: FindOneQuery;
  data: UpdateOneData;
  credentials: any;
}

export interface DeleteOneTransactionLogsService {
  query: FindOneQuery;
  credentials: any;
}
