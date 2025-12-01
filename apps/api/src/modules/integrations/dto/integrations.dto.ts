import { IsString, IsOptional, IsEnum, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IntegrationType } from '@crm/prisma/generated/prisma';

export class CreateIntegrationDto {
  @ApiProperty({ enum: IntegrationType })
  @IsEnum(IntegrationType)
  type: IntegrationType;

  @ApiProperty()
  @IsObject()
  config: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateIntegrationDto {
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  config?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

