import { IsString, IsOptional, IsNumber, IsDateString, IsObject, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateDealDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  stage?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  value?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  @IsOptional()
  probability?: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  expectedCloseDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  leadId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedToId?: string;
}

export class UpdateDealDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  stage?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  value?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  @IsOptional()
  probability?: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  expectedCloseDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  leadId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedToId?: string;
}

