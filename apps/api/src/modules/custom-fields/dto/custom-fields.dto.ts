import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntityType, FieldType } from '@crm/prisma/generated/prisma';

export class CreateCustomFieldDto {
  @ApiProperty({ enum: EntityType })
  @IsEnum(EntityType)
  entityType: EntityType;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: FieldType })
  @IsEnum(FieldType)
  fieldType: FieldType;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;
}

export class UpdateCustomFieldDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ enum: FieldType })
  @IsEnum(FieldType)
  @IsOptional()
  fieldType?: FieldType;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;
}

