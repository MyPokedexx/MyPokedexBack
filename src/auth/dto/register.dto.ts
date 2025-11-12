import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  password: string;

  @ApiProperty({ example: 'Jean Dupont' })
  name?: string;
}
