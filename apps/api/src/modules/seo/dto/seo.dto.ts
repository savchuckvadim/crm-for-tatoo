import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeoKeywordDto {
  @ApiProperty()
  @IsString()
  keyword: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  volume?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  difficulty?: number;
}

export class CreateSeoArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  keywords?: string[];

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  faqSchema?: Record<string, any>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ogImage?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  aiGenerated?: boolean;
}

export class UpdateSeoArticleDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  keywords?: string[];

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  faqSchema?: Record<string, any>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ogImage?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

