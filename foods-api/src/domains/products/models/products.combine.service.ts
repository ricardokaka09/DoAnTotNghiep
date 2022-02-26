import { Injectable } from '@nestjs/common';
import { RatingServices } from '../../../domains/ratings/ratings.service';
import { SubCategoriesService } from '../../../domains/sub_categories/sub_categories.service';
import recommendationProducts from '../../../helpers/collabfilter';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductCombineService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ratingsService: RatingServices,
    private readonly subCategoriesService: SubCategoriesService,
  ) {}

  async recommenderProduct({ query, credentials }) {
    try {
      // const productData = await this.productsService.findMany({
      //   query: {},
      //   credentials,
      // });

      const [
        { list: productsData },
        { list: productsKeywords },
        { list: ratings },
      ] = await Promise.all([
        this.productsService.findMany({
          query: {},
          credentials,
        }),
        this.subCategoriesService.findMany({
          query: {},
          credentials,
        }),
        this.ratingsService.findMany({
          query: {},
          credentials,
        }),
      ]);

      return recommendationProducts([productsData, productsKeywords, ratings]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
