import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { RequestUserCreate } from './user.dto';

/**
 * UserController handles incoming HTTP requests related to user operations.
 * @created 2024-07-06 Initial creation of UserController by NhatNHH
 */
@Controller('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Retrieves all users from the database.
     * @returns  An array of User entities representing all users in the database.
     */
    @Get("/users")
    async findAllUser(): Promise<User[]> {
        return await this.userService.findAll();
    }

    /**
     * Create a new User
     * @param RequestUserCreate
     * @returns  user created from the database
     */
    @Post()
    async createUser(@Body() createUserDto: RequestUserCreate): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }
}
