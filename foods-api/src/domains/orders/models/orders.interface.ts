import { Orders } from './orders.schema';

interface CreateOneData {
  name: string;
  storeID?: string;
  userID?: string;
  description?: string;
  totalAmount?: number;
  originalAmount?: number;
  discount?: number;
  fee?: number;
  type?: string;
  status?: string;
  receiveAt?: string;
}

interface FindOneQuery {
  orderID: string;
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
  storeID?: string;
}

interface UpdateOneData {
  name?: string;
  description?: string;
  totalAmount?: number;
  discount?: number;
  fee?: number;
  type?: string;
  status?: string;
  receiveAt?: string;
}

export interface CreateOneOrderService {
  data: CreateOneData;
  credentials: any;
}

export interface FindOneOrderService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManyOrderService {
  query: FindManyQuery;
  credentials: any;
}

export interface FindManyOrderResult {
  totalCount: number;
  list: Orders[];
}

export interface UpdateOneOrderService {
  data: UpdateOneData;
  query: FindOneQuery;
  credentials: any;
}

export interface DeleteOneOrderService {
  query: FindOneQuery;
  credentials: any;
}
