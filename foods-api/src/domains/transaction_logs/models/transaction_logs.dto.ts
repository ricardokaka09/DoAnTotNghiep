import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class FindOneTransactionLogs {
  @ApiProperty()
  @IsString()
  transactionLogID: string
}

export class FindManyTransactionLogs{
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transactionLogID?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyID?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  storeID?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userID?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderID?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  readonly offset?: number

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number = 10

  @ApiPropertyOptional({ enum: ['transactionLogID', 'createdAt', 'companyID', 'storeID', 'userID', 'orderID', 'status', 'type'] })
  @IsEnum(['transactionLogID', 'createdAt', 'companyID', 'storeID', 'userID', 'orderID', 'status', 'type'])
  @IsOptional()
  readonly sortBy?: string = 'transactionLogID'

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  readonly sortDirection?: string = 'ASC'
}
