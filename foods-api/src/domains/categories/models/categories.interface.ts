import { Categories } from './categories.schema';

interface CreateOneData {
  name: string;
  companyID?: string;
  storeID?: string;
  totalProduct?: number;
  description?: string;
  createdBy?: string;
}

interface UpdateOneData {
  name?: string;
  totalProduct?: number;
  description?: string;
}

interface FindOneQuery {
  categoryID: string;
  name?: string;
}

interface FindManyQuery {
  categoryID?: string | string[];
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortDirection?: string;
  name?: string;
  totalProduct?: number;
}

export interface CreateOneCategoryService {
  data: CreateOneData;
  credentials: any;
}

export interface UpdateOneCategoryService {
  data: UpdateOneData;
  query: FindOneQuery;
  credentials: any;
}

export interface FindOneCategoryService {
  query: FindOneQuery;
  credentials: any;
  relations: [];
}

export interface FindManyCategoryService {
  query: FindManyQuery;
  credentials: any;
}

export interface DeleteOneCategoryService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManyCategoryResult {
  totalCount: number;
  list: Categories[];
}
