import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { TypeTransactionEnum } from './enum';

export class CreateOrderProducts {
  @ApiProperty()
  @IsString()
  productID?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  quantity?: number;
}
export class UpdateOrderProducts {
  @ApiProperty()
  @IsString()
  orderProductID: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderLogs {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  storeID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  originalAmount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  fee?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  receiveAt?: string;

  @ApiProperty()
  @IsString()
  event: string;
}
export class CreateOrderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  storeID?: string;

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
  receiveAt?: string;

  @ApiProperty({ type: CreateOrderProducts })
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsObject()
  @Type(() => CreateOrderProducts)
  readonly orderProducts: CreateOrderProducts;
}

export class UpdateOrderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
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
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  receiveAt?: string;

  @ApiProperty({ type: [UpdateOrderProducts] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderProducts)
  readonly orderProducts: UpdateOrderProducts[];
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
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 10;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly cursor?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  readonly offset?: number;
}

export class DeleteManyOrderProductsServiceDto {
  @ApiProperty()
  @IsArray()
  readonly orderProducts: string[];
}

export class AcceptTransactionsServiceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  readonly manualFee?: number = 0;
}
export class DenyTransactionsServiceDto {
  @ApiProperty()
  @IsString()
  deniedReason: string;
}

export class CheckoutOrder {
  @ApiProperty({ enum: TypeTransactionEnum })
  @IsString()
  @IsEnum(TypeTransactionEnum)
  typeTransaction: TypeTransactionEnum;
}

export class ScheduleOrderDto {
  @ApiProperty()
  @IsString()
  receiveAt: string;
}
