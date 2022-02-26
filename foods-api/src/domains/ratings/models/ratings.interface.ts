import { Ratings } from './ratings.schema';

export class FindManyOrderResult {
  totalCount: number;
  list: Ratings[];
}
