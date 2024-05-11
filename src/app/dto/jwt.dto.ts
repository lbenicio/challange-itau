import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MaxLength, IsAlpha } from 'class-validator';

type Role = 'Admin' | 'Member' | 'External';
const maxLength = 256;
export class JwtDto {
  @ApiProperty({
    example: 'Toninho Araujo',
    required: true,
  })
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(maxLength)
  Name: string;

  @ApiProperty({
    example: 'Admin | Member | External',
    required: true,
  })
  @IsNotEmpty()
  Role: Role;

  @ApiProperty({
    example: '72341',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  Seed: number;
}
