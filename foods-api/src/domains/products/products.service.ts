import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import {
  CreateOneProductService,
  DeleteProductService,
  FindManyProductResult,
  FindManyProductService,
  FindOneProductService,
  UpdateOneProductService,
} from './models/products.interface';
import { Products } from './models/products.schema';
import {
  buildFindingQuery,
  buildRegexQuery,
  findPriceQuery,
} from '../../helpers/build';
import { NotFound } from '../../shared/assertions';

@EntityRepository(Products)
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async createOne({
    data,
    credentials,
  }: CreateOneProductService): Promise<Products> {
    try {
      const payload = {
        ...data,
        createdBy: credentials.userID,
      };

      // this.validateAccess.validateAccessToSingle({
      //   data: payload,
      //   credentials,
      // });

      const newProduct = await this.productsRepository.save(payload);

      return newProduct;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneProductService): Promise<boolean> {
    try {
      const product = await this.productsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [product],
        errorName: 'ProductNotFound',
      });

      // this.validateAccess.validateAccessToSingle({
      //   data: product,
      //   credentials,
      // });

      await this.productsRepository.update(
        { productID: product.productID },
        data,
      );

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({
    query,
    credentials,
  }: FindOneProductService): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [product],
        errorName: 'ProductNotFound',
      });

      // this.validateAccess.validateAccessToSingle({
      //   data: product,
      //   credentials,
      // });

      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManyProductService): Promise<FindManyProductResult> {
    try {
      const { fromPrice, toPrice, ...newQuery } = query;

      const { sortBy = 'createdAt', limit, offset } = newQuery;

      query = buildRegexQuery({
        query: newQuery,
        regexFields: ['name'],
      });

      const { sortingCondition, findingQuery, hasPage, findAllQuery } =
        buildFindingQuery({
          query: {
            ...query,
            sortBy,
          },
        });

      const findProductsByPrice = findPriceQuery({ fromPrice, toPrice });

      const promise = [];

      if (hasPage) {
        promise.push(
          this.productsRepository.find({
            where: {
              ...findingQuery,
              ...findProductsByPrice,
            },
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.productsRepository.count({
            where: {
              ...findAllQuery,
              ...findProductsByPrice,
            },
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.productsRepository.find({
            where: {
              ...findAllQuery,
              ...findProductsByPrice,
            },
            order: sortingCondition,
          }),
          this.productsRepository.count({
            where: {
              ...findAllQuery,
              ...findProductsByPrice,
            },
          }),
        );
      }

      const [product, totalCount] = await Promise.all(promise);

      if (!product || !product.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      // const { validData } = this.validateAccess.validateAccessToList<Products>({
      //   data: product,
      //   credentials,
      // });

      return {
        totalCount,
        list: product,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteProductService): Promise<boolean> {
    try {
      const product = await this.productsRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [product],
        errorName: 'ProductNotFound',
      });

      // this.validateAccess.validateAccessToSingle({
      //   data: product,
      //   credentials,
      // });

      await this.productsRepository.remove(product);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
