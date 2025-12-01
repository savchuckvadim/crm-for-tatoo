import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty()
  @IsString()
  paymentMethod: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsString()
  plan: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentMethod?: string;
}

