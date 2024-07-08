import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { RequestUserCreate } from './user.dto';
import { MSAResponse } from 'src/common/response/msa-response';
import { HTTP_MESSAGE, HTTP_STATUS } from 'src/common/enum/http-status';
import { Builder } from 'builder-pattern';

/**
 * UserController handles incoming HTTP requests related to user operations.
 * @created 2024-07-06 Initial creation of UserController by NhatNHH
 */
@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves all users from the database.
   * @returns MSAResponse exists an array of User entities representing all users in the database.
   */
  @Get('/users')
  async findAllUser(): Promise<MSAResponse<User[]>> {
    const users = await this.userService.findAll();
    return Builder<MSAResponse<User[]>>()
      .status(HTTP_STATUS.OK)
      .message(HTTP_MESSAGE.OK)
      .data(users)
      .build();
  }

  /**
   * Create a new User
   * @param RequestUserCreate
   * @returns MSAResponse exists an user created from the database
   */
  @Post('/create')
  async createUser(
    @Body() createUserDto: RequestUserCreate,
  ): Promise<MSAResponse<User>> {
    const userCreated = await this.userService.createUser(createUserDto);
    return Builder<MSAResponse<User>>()
      .status(HTTP_STATUS.OK)
      .message(HTTP_MESSAGE.OK)
      .data(userCreated)
      .build();
  }
}
