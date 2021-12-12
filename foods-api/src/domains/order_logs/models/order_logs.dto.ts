import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindOrderLogDto {
  @ApiProperty()
  @IsString()
  orderLogID: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class FindManyOrderLogDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderLogID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  storeID?: string;

  @ApiPropertyOptional({
    enum: [
      'orderLogID',
      'orderID',
      'createdAt',
      'userID',
      'type',
      'status',
      'receivedAt',
    ],
  })
  @IsEnum([
    'orderLogID',
    'orderID',
    'createdAt',
    'userID',
    'type',
    'status',
    'receivedAt',
  ])
  @IsOptional()
  readonly sortBy?: string = 'orderLogID';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  readonly sortDirection?: string = 'ASC';

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  readonly limit?: string = '10';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly cursor?: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  readonly offset?: string;
}
