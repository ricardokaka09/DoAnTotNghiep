import { Transactions } from './transactions.schema';

interface FindOneQuery {
  transactionID: string;
}
interface FindManyQuery {
  transactionID?: string;
  storeID?: string;
  userID?: string;
  orderID?: string;
  amount?: number;
  originAmount?: number;
  percentFee?: number;
  status?: string;
  deniedReason?: string;
  memo?: string;
  type?: string;
  note?: string;
  offset?: string;
  limit?: string;
  sortBy?: string;
  sortDirection?: string;
}

interface CreateOneData {
  storeID: string;
  userID: string;
  orderID: string;
  amount: number;
  originAmount: number;
  percentFee?: number;
  fixedFee?: number;
  manualFee?: number;
  fee?: number;
  status?: string;
  deniedReason?: string;
  memo?: string;
  type: string;
  note?: string;
}

interface UpdateOneData {
  amount: number;
  originAmount: number;
  percentFee?: number;
  fixedFee?: number;
  manualFee?: number;
  fee?: number;
  status?: string;
  deniedReason?: string;
  memo?: string;
  type: string;
  note?: string;
}

export interface FindOneTransactionsService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManyTransactionsService {
  query: FindManyQuery;
  credentials: any;
  relations?: string[];
}

export interface FindManyTransactionsServiceResult {
  totalCount: number;
  list: Transactions[];
}

export interface CreateOneTransactionsService {
  data: CreateOneData;
  credentials: any;
}

export interface UpdateOneTransactionsService {
  query: FindOneQuery;
  data: UpdateOneData;
  credentials: any;
}

export interface DeleteOneTransactionService {
  query: FindOneQuery;
  credentials: any;
}
