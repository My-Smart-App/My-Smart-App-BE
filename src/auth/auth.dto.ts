import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_ERROR_MESSAGE } from 'src/common/enum/error-message';

interface IRequestLoginDTO {
  username: string;
  password: string;
}

export class ResquestLoginDTO implements IRequestLoginDTO {
  @ApiProperty({ example: 'admin', description: 'username of the account' })
  @IsNotEmpty({ message: AUTH_ERROR_MESSAGE.USERNAME_IS_NOT_EMPTY })
  @IsString({ message: AUTH_ERROR_MESSAGE.USERNAME_IS_STRING })
  username: string;

  @ApiProperty({ example: 'admin', description: 'password of the account' })
  @IsNotEmpty({ message: AUTH_ERROR_MESSAGE.USERNAME_IS_NOT_EMPTY })
  @IsString({ message: AUTH_ERROR_MESSAGE.USERNAME_IS_STRING })
  password: string;
}

export interface JWTPayload {
  sub: string;
  username: string;
  role: string | string[];
}
