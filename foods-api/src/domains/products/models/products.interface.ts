// import { Credentials } from 'sn-api-sdk/lib/validate_access/validate_access'
import { Products } from './products.schema';

interface CreateOneData {
  name: string;
  subCategoryID?: string;
  categoryID?: string;
  companyID?: string;
  storeID?: string;
  description?: string;
  price?: number;
  minPrice?: number;
  photos?: string[];
  thumbNail?: string;
  type?: string;
  tag?: string;
  origin?: string;
  properties?: string;
  tradeMark?: string;
}

interface FindOneQuery {
  productID: string;
  name?: string;
}

interface FindManyQuery {
  productID?: string;
  name?: string;
  fromPrice?: string;
  toPrice?: string;
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortDirection?: string;
  companyID?: string;
  storeID?: string;
  categoryID?: string | string[];
  subCategoryID?: string | string[];
}

interface UpdateOneData {
  name?: string;
  description?: string;
  price?: number;
  minPrice?: number;
  photos?: string[];
  thumbNail?: string;
  type?: string;
  tag?: string;
  quantity?: number;
  origin?: string;
  properties?: string;
  trademark?: string;
}

export interface CreateOneProductService {
  data: CreateOneData;
  credentials: any;
}

export interface FindOneProductService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManyProductService {
  query: FindManyQuery;
  credentials: any;
}

export interface FindManyProductResult {
  totalCount: number;
  list: Products[];
}

export interface UpdateOneProductService {
  data: UpdateOneData;
  query: FindOneQuery;
  credentials: any;
}

export interface DeleteProductService {
  query: FindOneQuery;
  credentials: any;
}
