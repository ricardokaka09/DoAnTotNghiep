import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { StatusTransactions } from '../enums/types';

export class CreateTransactionsDto {
  @ApiProperty()
  @IsString()
  storeID: string;

  @ApiProperty()
  @IsString()
  userID: string;

  @ApiProperty()
  @IsString()
  orderID: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  originAmount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Max(1)
  @Min(0)
  percentFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  fixedFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  manualFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  fee: number;

  @ApiPropertyOptional({
    enum: [
      StatusTransactions.CUSTOMER_CANCELED,
      StatusTransactions.CUSTOMER_ACCEPTED,
      StatusTransactions.PENDING,
      StatusTransactions.DENIED,
      StatusTransactions.PROCESSING,
      StatusTransactions.FINISHED,
    ],
  })
  @IsOptional()
  @IsString()
  @IsEnum([
    StatusTransactions.CUSTOMER_CANCELED,
    StatusTransactions.CUSTOMER_ACCEPTED,
    StatusTransactions.PENDING,
    StatusTransactions.DENIED,
    StatusTransactions.PROCESSING,
    StatusTransactions.FINISHED,
  ])
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deniedReason: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note: string;
}
export class UpdateTransactionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  originAmount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Max(1)
  @Min(0)
  percentFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fixedFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  manualFee: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  fee: number;

  @ApiPropertyOptional({
    enum: [
      StatusTransactions.CUSTOMER_CANCELED,
      StatusTransactions.CUSTOMER_ACCEPTED,
      StatusTransactions.PENDING,
      StatusTransactions.DENIED,
      StatusTransactions.PROCESSING,
      StatusTransactions.FINISHED,
    ],
  })
  @IsOptional()
  @IsString()
  @IsEnum([
    StatusTransactions.CUSTOMER_CANCELED,
    StatusTransactions.CUSTOMER_ACCEPTED,
    StatusTransactions.PENDING,
    StatusTransactions.DENIED,
    StatusTransactions.PROCESSING,
    StatusTransactions.FINISHED,
  ])
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deniedReason: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note: string;
}
