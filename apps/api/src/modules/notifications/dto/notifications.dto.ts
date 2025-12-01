import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty()
  @IsEmail()
  to: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  body: string;
}

export class SendSMSDto {
  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  message: string;
}

