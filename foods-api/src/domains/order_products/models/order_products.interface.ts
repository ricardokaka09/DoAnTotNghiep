import { OrderProducts } from './order_products.schema';

interface CreateOneDate {
  productID?: string;
  quantity?: number;
}

interface UpdateOneData {
  storeID?: string;
  userID?: string;
  orderID?: string;
  productID?: string;
  quantity?: number;
}

interface FindOneQuery {
  orderProductID: string;
  productID?: string;
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
  productID?: string;
}

export interface CreateOneOrderProductService {
  data: CreateOneDate;
  credentials: any;
}
export interface FindOneOrderProductService {
  query: FindOneQuery;
  credentials: any;
}
export interface FindManyOrderProductService {
  query: FindManyQuery;
  credentials: any;
}

export interface FindManyOrderProductResult {
  totalCount: number;
  list: OrderProducts[];
}
export interface UpdateOneOrderProductService {
  query: FindOneQuery;
  data: UpdateOneData;
  credentials: any;
}
export interface UpdateQuantityOrderProductService {
  query: FindOneQuery;
  quantity: number;
  credentials: any;
}

export interface DeleteOneOrderProductService {
  query: FindOneQuery;
  credentials: any;
}
