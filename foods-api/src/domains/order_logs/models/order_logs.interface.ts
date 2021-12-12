import { OrderLogs } from './order_logs.schema';

interface CreateOneData {
  name: string;
  orderID?: string;
  storeID?: string;
  userID?: string;
  description?: string;
  totalAmount?: number;
  originalAmount?: number;
  discount?: number;
  fee?: number;
  type?: string;
  status?: string;
  receivedAt?: string;
  event: string;
}

interface FindOneQuery {
  orderLogID: string;
  name?: string;
}

interface FindManyQuery {
  orderID?: string;
  name?: string;
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortDirection?: string;
  userID?: string;
  companyID?: string;
  storeID?: string;
}

interface UpdateOneData {
  name?: string;
  description?: string;
  discount?: number;
  fee?: number;
  type?: string;
  status?: string;
  receivedAt?: string;
}

export interface CreateOneOrderLogService {
  data: CreateOneData;
  credentials: any;
}

export interface FindOneOrderLogService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManyOrderLogService {
  query: FindManyQuery;
  credentials: any;
}

export interface FindManyOrderLogResult {
  totalCount: number;
  list: OrderLogs[];
}

export interface UpdateOneOrderLogService {
  data: UpdateOneData;
  query: FindOneQuery;
  credentials: any;
}

export interface DeleteOneOrderLogService {
  query: FindOneQuery;
  credentials: any;
}
