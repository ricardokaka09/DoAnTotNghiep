import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  storeID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userID?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fee?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  receivedAt?: string;
}

export class UpdateOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  discount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fee?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  receiveAt?: string;
}

export class DeleteOrderDto {
  @ApiProperty()
  @IsString()
  orderID: string;
}

export class FindOrderDto {
  @ApiProperty()
  @IsString()
  orderID: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}

export class FindManyOrderDto {
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
    enum: ['orderID', 'createdAt', 'userID', 'type', 'status', 'receiveAt'],
  })
  @IsEnum(['orderID', 'createdAt', 'userID', 'type', 'status', 'receiveAt'])
  @IsOptional()
  readonly sortBy?: string = 'orderID';

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
