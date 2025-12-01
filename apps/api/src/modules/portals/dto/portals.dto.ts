import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePortalDto {
  @ApiProperty({ description: 'Portal name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Subdomain (e.g., "mysalon")' })
  @IsString()
  @IsOptional()
  subdomain?: string;

  @ApiPropertyOptional({ description: 'Custom domain' })
  @IsString()
  @IsOptional()
  customDomain?: string;

  @ApiPropertyOptional({ description: 'Logo URL' })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional({ description: 'Primary color (hex)' })
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @ApiPropertyOptional({ description: 'Secondary color (hex)' })
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiPropertyOptional({ description: 'Additional settings (JSON)' })
  @IsObject()
  @IsOptional()
  settings?: Record<string, any>;
}

export class UpdatePortalDto {
  @ApiPropertyOptional({ description: 'Portal name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Subdomain' })
  @IsString()
  @IsOptional()
  subdomain?: string;

  @ApiPropertyOptional({ description: 'Custom domain' })
  @IsString()
  @IsOptional()
  customDomain?: string;

  @ApiPropertyOptional({ description: 'Logo URL' })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional({ description: 'Primary color' })
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @ApiPropertyOptional({ description: 'Secondary color' })
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiPropertyOptional({ description: 'Settings' })
  @IsObject()
  @IsOptional()
  settings?: Record<string, any>;
}

