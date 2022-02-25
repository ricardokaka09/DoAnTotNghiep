import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ratings } from './models/ratings.schema';
import { RatingControllers } from './ratings.controller';
import { RatingServices } from './ratings.service';

const ratingRepository = TypeOrmModule.forFeature([Ratings]);
@Module({
  imports: [ratingRepository],
  controllers: [RatingControllers],
  providers: [RatingServices],
  exports: [ratingRepository, RatingServices],
})
export class RatingModule {}
