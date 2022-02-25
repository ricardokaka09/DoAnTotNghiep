import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { AccessValidator } from '../../shared/validation';
import { buildFindingQuery } from '../../helpers/build';
import { FindManyOrderResult } from './models/ratings.interface';
import { Ratings } from './models/ratings.schema';

@EntityRepository(Ratings)
export class RatingServices {
  constructor(
    @InjectRepository(Ratings)
    private readonly ratingRepository: Repository<Ratings>,
  ) {}
  private readonly validateAccess = new AccessValidator();

  async createOne({ data, user }): Promise<Ratings> {
    try {
      const payload = {
        ...data,
        userID: user.userID,
        createdBy: user.userID,
      };

      const rating = await this.ratingRepository.save(payload);

      return rating;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query, credentials }): Promise<Ratings> {
    try {
      const rating = await this.ratingRepository.findOne({ where: query });

      if (!rating) {
        throw new Error('Rating is not found');
      }

      this.validateAccess.validateAccessToSingle({
        data: rating,
        credentials,
      });

      return rating;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ query, data, credentials }): Promise<boolean> {
    try {
      const rating = await this.ratingRepository.findOne({ where: query });

      if (!rating) {
        throw new Error('Rating not found');
      }

      await this.ratingRepository.update({ ratingID: rating.ratingID }, data);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query, credentials }): Promise<FindManyOrderResult> {
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
          this.ratingRepository.find({
            where: findingQuery,
            order: sortingCondition,
            skip: Number(offset),
            take: Number(limit),
          }),
          this.ratingRepository.count({
            where: findAllQuery,
          }),
        );
      }

      if (!hasPage) {
        promise.push(
          this.ratingRepository.find({
            where: findAllQuery,
            order: sortingCondition,
          }),
          this.ratingRepository.count({
            where: findAllQuery,
          }),
        );
      }

      const [orders, totalCount] = await Promise.all(promise);

      if (!orders || !orders.length || !totalCount) {
        return {
          totalCount: 0,
          list: [],
        };
      }

      return {
        totalCount,
        list: orders,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({ query, credentials }): Promise<boolean> {
    try {
      const rating = await this.ratingRepository.findOne({ where: query });

      if (!rating) {
        throw new Error('Rating not found');
      }

      this.validateAccess.validateAccessToSingle({
        data: rating,
        credentials,
      });

      await this.ratingRepository.remove(rating);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
