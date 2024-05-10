type Role = 'Admin' | 'Member' | 'External';

export class JwtDto {
  Name: string;
  Role: Role;
  Seed: number;
}
