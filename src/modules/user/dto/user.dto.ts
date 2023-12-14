import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  name: string;
}
