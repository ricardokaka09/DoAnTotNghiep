import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderProductDto {
  @ApiProperty()
  @IsString()
  productID?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
export class UpdateOrderProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
export class DeleteOrderProductDto {
  @ApiProperty()
  @IsString()
  orderProductID: string;
}

export class FindOrderProductDto {
  @ApiProperty()
  @IsString()
  orderProductID: string;
}
export class FindManyOrderProductDto {
  @ApiProperty()
  @IsString()
  orderProductID: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productID: string;

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
