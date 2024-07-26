import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AppUser } from './app-user.schema';
import { AuthErrorMessage } from '../common/enum/error-message';
import { User } from '../user/user.schema';

interface IRequestLoginDTO {
  username: string;
  password: string;
}

export class ResquestLoginDTO implements IRequestLoginDTO {
  @ApiProperty({ example: 'admin', description: 'username of the account' })
  @IsNotEmpty({ message: AuthErrorMessage.USERNAME_IS_NOT_EMPTY })
  @IsString({ message: AuthErrorMessage.USERNAME_IS_STRING })
  username: string;

  @ApiProperty({ example: 'admin', description: 'password of the account' })
  @IsNotEmpty({ message: AuthErrorMessage.USERNAME_IS_NOT_EMPTY })
  @IsString({ message: AuthErrorMessage.USERNAME_IS_STRING })
  password: string;
}

export interface IJWTPayload {
  sub: string;
  username: string;
  role: string | string[];
}

export interface IRequestLoginValidator {
  hasError: boolean;
  errMsg: string | string[] | null;
  data: AppUser | null;
}

export interface ResponseLogin {
  token: string | null;
  user: User | null;
}
