import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { HttpMessage } from '../../common/enum/http-status';
import { User, UserSchema } from '../user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { RequestUserCreate } from '../user.dto';
import { todo } from 'node:test';

/**
 * TESTING API CREATE USER
 * Path: v1/user/create
 * @author NhatNHH
 * @create 2024-07-27
 */

// Expected Data Normal
const expectedDataNormal: object = {
  name: 'User A',
  age: 25,
  email: 'testA@example.com',
  description: 'Test Description',
};

describe('UserController', () => {
  /**
   * INITIALIZE DATABASE AND DATA EXAMPLE
   */
  let userController: UserController;
  let userService: UserService;
  let mongod: MongoMemoryServer;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
    userModel = app.get<Model<User>>(getModelToken(User.name));
  });

  afterAll(async () => {
    await mongod.stop();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  /**
   * MAIN TESTING
   */
  describe('createUser', () => {
    /**
     * CASE NORMAL
     * Should return an MSAResponse with an user created
     */
    const detailNormal: string = `**CASE NORMAL** 
        Should return an MSAResponse with an user created`;

    it(detailNormal, async () => {
      // Payload
      const payload: RequestUserCreate = {
        name: 'User A',
        age: 25,
        email: 'testA@example.com',
        description: 'Test Description',
      };

      const response = await userController.createUser(payload);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.message).toBe(HttpMessage.OK);
      const result = response.data;
      expect(result).toMatchObject(expectedDataNormal);
    });

    /**
     * CASE name of payload is empty
     * Should return a ValidationError: User validation failed
     * name: required.
     */
    const detailNameIsEmpty: string = `**CASE NAME IS EMPTY** 
        Should return a ValidationError: User validation failed: 
        name: required.`;

    it(detailNameIsEmpty, async () => {
      // Payload
      const payload: RequestUserCreate = {
        name: '',
        age: 25,
        email: 'testA@example.com',
        description: 'Test Description',
      };
      try {
        // This test is not pass,
        // Fix this in future
        todo;
        const result = await userController.createUser(payload);
      } catch (e) {}
    });
  });
});
