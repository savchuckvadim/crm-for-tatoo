import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSerpPositionDto {
  @ApiProperty()
  @IsString()
  keywordId: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  position?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  searchEngine?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;
}

