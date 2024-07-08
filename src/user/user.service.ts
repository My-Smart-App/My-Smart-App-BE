
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestUserCreate } from './user.dto';

/**
 * Service responsible for handling user-related operations.
 * Provides methods to retrieve, create, update, and delete users.
 * @created 2024-07-06 Initial creation of UserService by NhatNHH
 */
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private readonly userModel: Model<User>,

    ) {}

    /**
     * Retrieves all users from the database.
     * @returns An array of User entities representing all users in the database.
     */
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    /**
     * Validate payload and create new user and insert into the database
     * @param RequestUserCreate
     * @returns created user
     */
    async createUser(createUserDto: RequestUserCreate): Promise<User> {
        const createdUser: User = new this.userModel(createUserDto);
        return await createdUser.save();
    }
}
