import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Payload } from 'src/common/decorators/payload.decorator';
import { IPayload } from 'src/common/interfaces/payload.interface';
import { UserPutResponseDto } from './dto/user-put-response.dto';
import { UserPutDto } from './dto/user-put.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('/users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get('me')
  @ApiOkResponse({ type: UserDto })
  getMe(@Payload() payload: IPayload): Promise<UserDto> {
    return this.service.findOneOrFailWithTags(payload.sub);
  }

  @Patch('me')
  @ApiOkResponse({ type: UserPutResponseDto })
  updateMe(
    @Payload() payload: IPayload,
    @Body() dto: UserPutDto,
  ): Promise<UserPutResponseDto> {
    return this.service.updateUser(dto, payload.sub);
  }

  @Delete('me')
  @ApiOkResponse({ type: UserDto })
  delete(@Payload() payload: IPayload): Promise<void> {
    return this.service.delete(payload.sub);
  }
}
