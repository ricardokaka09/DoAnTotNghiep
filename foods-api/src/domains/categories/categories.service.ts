import { InjectRepository } from '@nestjs/typeorm';
import { NotFound } from '../../shared/assertions';
import { Categories } from './models/categories.schema';
import {
  CreateOneCategoryService,
  UpdateOneCategoryService,
  FindOneCategoryService,
  DeleteOneCategoryService,
  FindManyCategoryService,
  FindManyCategoryResult,
} from './models/categories.interface';
import { EntityRepository, Repository } from 'typeorm';
import { buildFindingQuery } from '../../helpers/build';
import { AccessValidator } from '../../shared/validation';

@EntityRepository(Categories)
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}
  private readonly validateAccess = new AccessValidator();

  async createOne({
    data,
    credentials,
  }: CreateOneCategoryService): Promise<Categories> {
    try {
      const payload = {
        ...data,
        createBy: credentials.userID,
      };

      this.validateAccess.validateAccessToSingle({
        data: payload,
        credentials,
      });

      const newCategory = await this.categoriesRepository.save(payload);

      return newCategory;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneCategoryService): Promise<boolean> {
    try {
      const category = await this.categoriesRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [category],
        errorName: 'CategoryNotFound',
      });

      this.validateAccess.validateAccessToSingle({
        data: category,
        credentials,
      });

      await this.categoriesRepository.update(
        { categoryID: category.categoryID },
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
    relations: [],
  }: FindOneCategoryService): Promise<Categories> {
    try {
      const category = await this.categoriesRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [category],
        errorName: 'CategoryNotFound',
      });

      this.validateAccess.validateAccessToSingle({
        data: category,
        credentials,
      });

      return category;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManyCategoryService): Promise<FindManyCategoryResult> {
    try {
      const { sortBy = 'createdAt', limit, offset } = query;
      const { sortingCondition, findingQuery, hasPage, findAllQuery } =
        buildFindingQuery({
          query: {
            ...query,
            sortBy,
          },
        });

      const promise = [];

      if (hasPage) {
        promise.push(
          this.categoriesRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.categoriesRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.categoriesRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.categoriesRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [categories, totalCount] = await Promise.all(promise);

      if (!categories || !categories.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: categories,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteOneCategoryService): Promise<boolean> {
    try {
      const category = await this.categoriesRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [category],
        errorName: 'CategoryNotFound',
      });

      this.validateAccess.validateAccessToSingle({
        data: category,
        credentials,
      });

      await this.categoriesRepository.remove(category);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async updateTotalProduct(
    categoryID: string,
    value: number,
    actions: string,
  ): Promise<boolean> {
    const manager = this.categoriesRepository.manager;
    if (actions === 'increment') {
      await manager.increment(
        Categories,
        { categoryID: `${categoryID}` },
        'totalProduct',
        value,
      );
    }
    if (actions === 'decrement') {
      await manager.decrement(
        Categories,
        { categoryID: `${categoryID}` },
        'totalProduct',
        value,
      );
    }
    return true;
  }
}
