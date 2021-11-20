import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    price?: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    minPrice?: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    photo?: string[]

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    thumbNail?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    type?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tag?: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    quantity?: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    subCategoryID?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    categoryID?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    origin?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    properties?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    trademark?: string
}

export class UpdateProductDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    price?: number

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    minPrice?: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    photos?: string[]

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    thumbNail?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    type?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tag?: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    quantity?: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    origin?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    properties?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    trademark?: string
}

export class DeleteProductDto {
    @ApiProperty()
    @IsString()
    pruductID: string
}

export class FindProductDto {
    @ApiProperty()
    @IsString()
    productID: string
}

export class FindManyProductDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    productID?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    categoryID?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    subCategoryID?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fromPrice?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    toPrice?: string

    @ApiPropertyOptional({ enum: ['productID', 'createdAt', 'categoryID', 'price'] })
    @IsEnum(['productID', 'createdAt', 'categoryID', 'price'])
    @IsOptional()
    readonly sortBy?: string = 'productID'

    @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
    @IsEnum(['ASC', 'DESC'])
    @IsOptional()
    readonly sortDirection?: string = 'ASC'

    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    readonly limit?: string = '10'

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly cursor?: string

    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    readonly offset?: string
}