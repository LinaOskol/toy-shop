import { ApiProperty } from '@nestjs/swagger';

export class UserShortDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ format: 'uuid' })
  uid: string;
}
