import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Matches, IsInt } from 'class-validator';

type Role = 'Admin' | 'Member' | 'External';
const maxLength = 256;
export class JwtDto {
  constructor(jwt: any) {
    const keys = Object.keys(jwt);
    for (const key of keys) {
      const parsedInt = parseInt(jwt[key]);
      this[key] = isNaN(parsedInt) ? jwt[key] : parsedInt;
    }
  }

  @ApiProperty({
    example: 'Toninho Araujo',
    required: true,
  })
  @IsNotEmpty()
  @Matches(/^[A-Za-z ]+$/)
  @MaxLength(maxLength)
  private Name: string;

  @ApiProperty({
    example: 'Admin | Member | External',
    required: true,
  })
  @IsNotEmpty()
  private Role: Role;

  @ApiProperty({
    example: '72341',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  private Seed: number;

  public getName(): string {
    return this.Name;
  }

  public getRole(): Role {
    return this.Role;
  }

  public getSeed(): number {
    return this.Seed;
  }

  public setName(Name: string): void {
    this.Name = Name;
  }

  public setRole(Role: Role): void {
    this.Role = Role;
  }

  public setSeed(Seed: number): void {
    this.Seed = Seed;
  }
}
