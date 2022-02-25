import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsString()
  productID?: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(5)
  rating?: number;
}
