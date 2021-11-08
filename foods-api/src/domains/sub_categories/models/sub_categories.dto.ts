import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsEnum, IsNumberString } from 'class-validator'

export class CreateSubCategoryDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsString()
    categoryID: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string
}

export class UpdateSubCategoryDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    description?: string
}

export class DeleteSubCategoryDto {
    @ApiProperty()
    @IsString()
    subCategoryID: string
}

export class FindSubCategoryDto {
    @ApiProperty()
    @IsString()
    subCategoryID: string
}

export class FindManySubCategoryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    subCategoryID?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string

    @ApiPropertyOptional({ enum: ['subCategoryID', 'createdAt'] })
    @IsEnum(['subCategoryID', 'createdAt'])
    @IsOptional()
    readonly sortBy?: string = 'subCategoryID'

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