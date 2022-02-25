import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from './models/ratings.dto';
import { FindManyOrderResult } from './models/ratings.interface';
import { RatingServices } from './ratings.service';

@Controller('ratings')
@ApiTags('Stores')
export class RatingControllers {
  constructor(private readonly RatingService: RatingServices) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(@Body() data: CreateRatingDto, @Request() { user }) {
    try {
      const rating = await this.RatingService.createOne({ data, user });

      return rating;
    } catch (error) {
      throw error;
    }
  }

  @Get('')
  async findMany(
    @Request() { user },
    @Query() find,
  ): Promise<FindManyOrderResult> {
    try {
      const ratings = await this.RatingService.findMany({
        query: find,
        credentials: { ...user },
      });

      return ratings;
    } catch (error) {
      throw error;
    }
  }
}
