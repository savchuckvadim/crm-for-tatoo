import { IsString, IsOptional, IsEmail, IsObject, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeadStatus, LeadSource } from '@crm/prisma/generated/prisma';

export class CreateLeadDto {
  @ApiPropertyOptional({ enum: LeadSource })
  @IsEnum(LeadSource)
  @IsOptional()
  source?: LeadSource;

  @ApiPropertyOptional({ enum: LeadStatus })
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

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
  assignedToId?: string;
}

export class UpdateLeadDto {
  @ApiPropertyOptional({ enum: LeadStatus })
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

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
  assignedToId?: string;
}

