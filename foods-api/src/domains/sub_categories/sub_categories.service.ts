import { InjectRepository } from '@nestjs/typeorm';
import { NotFound } from '../../shared/assertions';
import { EntityRepository, Repository } from 'typeorm';
import {
  CreateOneSubCategoryService,
  DeleteOneSubCategoryService,
  FindManySubCategoryResult,
  FindManySubCategoryService,
  FindOneSubCategoryService,
} from './models/sub_categories.interface';
import { SubCategories } from './models/sub_categories.schema';
import { UpdateOneSubCategoryService } from './models/sub_categories.interface';
import { buildFindingQuery } from '../../helpers/build';

@EntityRepository(SubCategories)
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategories)
    private readonly subCategoriesRepository: Repository<SubCategories>,
  ) {}

  async createOne({
    data,
    credentials,
  }: CreateOneSubCategoryService): Promise<SubCategories> {
    try {
      const payload = {
        ...data,
        createBy: credentials.userID,
      };

      // this.validateAccess.validateAccessToSingle({
      //   data: payload,
      //   credentials,
      // });

      const newSubCategory = await this.subCategoriesRepository.save(payload);
      return newSubCategory;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    data,
    credentials,
  }: UpdateOneSubCategoryService): Promise<boolean> {
    try {
      const subCategory = await this.subCategoriesRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [subCategory],
        errorName: 'SubCategoryNotFound',
      });

      // this.validateAccess.validateAccessToSingle({
      //   data: subCategory,
      //   credentials,
      // });

      await this.subCategoriesRepository.update(
        { subCategoryID: subCategory.subCategoryID },
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
  }: FindOneSubCategoryService): Promise<SubCategories> {
    try {
      const subCategory = await this.subCategoriesRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [subCategory],
        errorName: 'SubCategoryNotFound',
      });

      // this.validateAccess.validateAccessToSingle({
      //   data: subCategory,
      //   credentials,
      // });

      return subCategory;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
    credentials,
  }: FindManySubCategoryService): Promise<FindManySubCategoryResult> {
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
          this.subCategoriesRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.subCategoriesRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.subCategoriesRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.subCategoriesRepository.count({
            where: findAllQuery,
          }),
        );
      }
      const [subCategory, totalCount] = await Promise.all(promise);

      if (!subCategory || !subCategory.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      // const { validData } =
      //   this.validateAccess.validateAccessToList<SubCategories>({
      //     data: subCategory,
      //     credentials,
      //   });

      return {
        totalCount,
        list: subCategory,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({
    query,
    credentials,
  }: DeleteOneSubCategoryService): Promise<boolean> {
    try {
      const subCategory = await this.subCategoriesRepository.findOne({
        where: query,
      });

      NotFound.isTruthy({
        and: [subCategory],
        errorName: 'SubCategoryNotFound',
      });

      // this.validateAccess.validateAccessToSingle({
      //   data: subCategory,
      //   credentials,
      // });

      await this.subCategoriesRepository.remove(subCategory);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateTotalProduct(
    subCategoryID: string,
    value: number,
    actions: string,
  ): Promise<boolean> {
    const manager = this.subCategoriesRepository.manager;
    if (actions === 'increment') {
      await manager.increment(
        SubCategories,
        { subCategoryID: `${subCategoryID}` },
        'totalProduct',
        value,
      );
    }
    if (actions === 'decrement') {
      await manager.decrement(
        SubCategories,
        { subCategoryID: `${subCategoryID}` },
        'totalProduct',
        value,
      );
    }
    return true;
  }
}
