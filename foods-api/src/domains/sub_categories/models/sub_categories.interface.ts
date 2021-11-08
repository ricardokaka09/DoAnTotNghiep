import { SubCategories } from './sub_categories.schema';

interface CreateOneData {
  name: string;
  categoryID: string;
  storeID?: string;
  companyID?: string;
  totalProduct?: number;
  createBy?: string;
  description?: string;
}

interface FindOneQuery {
  subCategoryID: string;
  name?: string;
}

interface FindManyQuery {
  subCategory?: string | string[];
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortDirection?: string;
  name?: string;
}

interface UpdateOneData {
  name?: string;
  totalProduct?: number;
  description?: string;
}

export interface CreateOneSubCategoryService {
  data: CreateOneData;
  credentials: any;
}

export interface FindOneSubCategoryService {
  query: FindOneQuery;
  credentials: any;
}

export interface UpdateOneSubCategoryService {
  data: UpdateOneData;
  query: FindOneQuery;
  credentials: any;
}

export interface DeleteOneSubCategoryService {
  query: FindOneQuery;
  credentials: any;
}

export interface FindManySubCategoryService {
  query: FindManyQuery;
  credentials: any;
}

export interface FindManySubCategoryResult {
  totalCount: number;
  list: SubCategories[];
}
