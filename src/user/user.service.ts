import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestUserCreate } from './user.dto';
import {
  IFindDTO,
  checkParamFindDTO,
} from '../common/utils-interface/find-dto';
import { escapeRegex } from '../common/regex/regex-func';

/**
 * Service responsible for handling user-related operations.
 * Provides methods to retrieve, create, update, and delete users.
 * @author NhatNHH
 * @created 2024-07-06
 */
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns An array of User entities representing all users in the database.
   * In Future, move this to Paginator module
   */
  public async findAll(findDTO: IFindDTO): Promise<User[]> {
    // Check value of search param
    const { search, orderBy, limit, offSet } = checkParamFindDTO(findDTO);

    const query = this.userRepository
      .find({
        name: { $regex: search, $options: 'i' },
      })
      .limit(limit)
      .skip(offSet)
      .sort(orderBy);

    const result = await query.exec();
    return result;
  }

  /**
   * Find user existed by name.
   * @returns user existed.
   */
  public async findOneByName(name: string): Promise<User> {
    const result: User = (await this.userRepository
      .findOne({ name })
      .exec()) as unknown as User;
    return result;
  }

  /**
   * Validate payload and create new user and insert into the database
   * @param RequestUserCreate
   * @returns created user
   */
  public async createUser(createUserDto: RequestUserCreate): Promise<User> {
    const createdUser: User = await new this.userRepository(
      createUserDto,
    ).save();
    return createdUser;
  }
}
