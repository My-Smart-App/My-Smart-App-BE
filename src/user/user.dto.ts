import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { USER_ERROR_MESSAGE } from 'src/common/enum/error-message';

interface IRequestUserCreate {
  username: string;
  age: number;
  email: string;
  description: string;
}

export class RequestUserCreate implements IRequestUserCreate {
  @ApiProperty({ example: 'admin', description: 'Name of the user' })
  @IsNotEmpty({ message: USER_ERROR_MESSAGE.NAME_IS_NOT_EMPTY })
  @IsString({ message: USER_ERROR_MESSAGE.NAME_IS_STRING })
  username: string;

  @ApiProperty({ example: 18, description: 'Age of the user' })
  @IsInt({ message: USER_ERROR_MESSAGE.AGE_IS_INTEGER })
  @Min(1, { message: USER_ERROR_MESSAGE.MIN_AGE })
  @Max(150, { message: USER_ERROR_MESSAGE.MAX_AGE })
  age: number;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: USER_ERROR_MESSAGE.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    example: 'My name is admin',
    description: 'Note of the user',
  })
  @IsString({ message: USER_ERROR_MESSAGE.DESCRIPTION_IS_STRING })
  description: string;
}
