import { IsString, IsOptional, IsDateString, IsEnum, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '@crm/prisma/generated/prisma';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsDateString()
  startTime: string;

  @ApiProperty()
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dealId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedToId?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class UpdateAppointmentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  endTime?: string;

  @ApiPropertyOptional({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dealId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assignedToId?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

