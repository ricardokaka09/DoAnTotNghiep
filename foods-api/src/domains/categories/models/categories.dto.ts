import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class DeleteCategoryDto {
  @ApiProperty()
  categoryID: string;
}

export class FindCategoryDto {
  @ApiProperty()
  @IsString()
  categoryID: string;
}

export class FindManyCategoryDto {
  @ApiPropertyOptional({ enum: ['categoryID', 'createdAt'] })
  @IsEnum(['categoryID', 'createdAt'])
  @IsOptional()
  readonly sortBy?: string = 'categoryID';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryID?: string;

  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  readonly offset?: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  readonly limit?: string = '10';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'] })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  readonly sortDirection?: string = 'ASC';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly cursor?: string;
}
