import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    required: false,
    example: 'John'
  })
  name?: string;

  @ApiProperty({
    description: 'User last name',
    required: false,
    example: 'Doe'
  })
  surname?: string;

  @ApiProperty({
    description: 'User display name',
    example: 'John Doe'
  })
  displayName: string;

  @ApiProperty({
    description: 'URL to user avatar image',
    required: false,
    example: 'https://example.com/avatar.jpg'
  })
  avatar?: string;

  @ApiProperty({
    description: 'User points/score',
    example: 100
  })
  points: number;

  @ApiProperty({
    description: 'User role in the system',
    enum: ['USER', 'ADMIN'],
    example: 'USER'
  })
  role: string;

  @ApiProperty({
    description: 'Whether user email is verified',
    example: true
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'User creation timestamp',
    example: '2024-03-20T12:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-03-20T12:00:00Z'
  })
  updatedAt: Date;
} 