import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { USER_ERROR_MESSAGE } from "src/common/enum/error-message";

interface IRequestUserCreate {
    username: string;
    age: number;
    email: string;
    description: string;
}

export class RequestUserCreate implements IRequestUserCreate {
    @ApiProperty({ example: 'admin', description: 'Username of the user' })
    @IsNotEmpty({message: USER_ERROR_MESSAGE.USERNAME_IS_NOT_EMPTY})
    @IsString({message: USER_ERROR_MESSAGE.USERNAME_IS_STRING})
    username: string;

    @ApiProperty({ example: 18, description: 'Username of the user' })
    @IsInt({message: USER_ERROR_MESSAGE.AGE_IS_INTEGER})
    @Min(1, {message: USER_ERROR_MESSAGE.MIN_AGE})
    @Max(150, {message: USER_ERROR_MESSAGE.MAX_AGE})
    age: number;

    @ApiProperty({ example: 'admin@gmail.com', description: 'Username of the user' })
    @IsEmail({},{message: USER_ERROR_MESSAGE.EMAIL_INVALID})
    email: string;

    @ApiProperty({ example: 'My name is admin', description: 'Username of the user' })
    @IsString({message: USER_ERROR_MESSAGE.DESCRIPTION_IS_STRING})
    description: string;
}