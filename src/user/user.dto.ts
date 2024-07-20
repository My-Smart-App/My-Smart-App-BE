import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UserErrorMessage } from 'src/common/enum/error-message';

interface IRequestUserCreate {
  name: string;
  age: number;
  email: string;
  description: string;
}

export class RequestUserCreate implements IRequestUserCreate {
  @ApiProperty({ example: 'admin', description: 'Name of the user' })
  @IsNotEmpty({ message: UserErrorMessage.NAME_IS_NOT_EMPTY })
  @IsString({ message: UserErrorMessage.NAME_IS_STRING })
  name: string;

  @ApiProperty({ example: 18, description: 'Age of the user' })
  @IsInt({ message: UserErrorMessage.AGE_IS_INTEGER })
  @Min(1, { message: UserErrorMessage.MIN_AGE })
  @Max(150, { message: UserErrorMessage.MAX_AGE })
  age: number;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: UserErrorMessage.EMAIL_INVALID })
  email: string;

  @ApiProperty({
    example: 'My name is admin',
    description: 'Note of the user',
  })
  @IsString({ message: UserErrorMessage.DESCRIPTION_IS_STRING })
  description: string;
}
