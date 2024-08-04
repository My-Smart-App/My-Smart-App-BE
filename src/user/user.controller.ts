import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { FindUsersDto, RequestUserCreate } from './user.dto';
import { HttpMessage, HttpStatus } from 'src/common/enum/http-status';
import { Builder } from 'builder-pattern';
import { MSAResponse } from '../common/response/msa-response';
import { UserValidator } from './user.validator';

/**
 * UserController handles incoming HTTP requests related to user operations.
 * @author NhatNHH
 * @created 2024-07-06
 */
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves all users from the database.
   * @author NhatNHH
   * @created 2024-07-06
   * @returns MSAResponse exists an array of User entities representing all users in the database.
   */
  @Get('/users')
  async findAllUser(
    @Query() findUsersDto: FindUsersDto,
  ): Promise<MSAResponse<User[]>> {
    const users = await this.userService.findAll(findUsersDto);
    return Builder<MSAResponse<User[]>>()
      .status(HttpStatus.OK)
      .message(HttpMessage.OK)
      .data(users)
      .build();
  }

  /**
   * Create a new User
   * @author NhatNHH
   * @created 2024-07-06
   * @param RequestUserCreate
   * @returns MSAResponse exists an user created from the database
   */
  @Post('/create')
  async createUser(
    @Body() createUserDto: RequestUserCreate,
  ): Promise<MSAResponse<User | UserValidator>> {
    // Validate payload
    const userValidated: UserValidator = await new UserValidator().validate(
      createUserDto,
    );

    if (userValidated.hasError) {
      return Builder<MSAResponse<UserValidator>>()
        .status(HttpStatus.BAD_REQUEST)
        .message(HttpMessage.BAD_REQUEST)
        .data(userValidated)
        .build();
    }

    // create user
    const userCreated = await this.userService.createUser(createUserDto);
    return Builder<MSAResponse<User>>()
      .status(HttpStatus.OK)
      .message(HttpMessage.OK)
      .data(userCreated)
      .build();
  }
}
