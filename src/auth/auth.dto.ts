import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AUTH_ERROR_MESSAGE } from 'src/common/enum/error-message';
import { User } from 'src/user/user.schema';

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

export interface IJWTPayload {
  sub: string;
  username: string;
  role: string | string[];
}

export interface IRequestLoginValidator {
  isValid: boolean;
  errMsg: string | string[];
  data: User | null;
}

export interface ResponseLogin {
  token: string | null;
  user: User | null;
}
