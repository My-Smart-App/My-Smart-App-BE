import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { HttpMessage } from '../../common/enum/http-status';
import { User, UserSchema } from '../user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { RequestUserCreate } from '../user.dto';

const payload: RequestUserCreate = {
  name: 'User A',
  age: 25,
  email: 'testA@example.com',
  description: 'Test Description',
};

const expectedDataNormal = {
  name: 'User A',
  age: 25,
  email: 'testA@example.com',
  description: 'Test Description',
};

describe('UserController', () => {
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

  describe('createUser', () => {
    const detailNormal: string = `**CASE NORMAL** 
        Should return an MSAResponse with an user created`;

    it(detailNormal, async () => {
      const response = await userController.createUser(payload);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.message).toBe(HttpMessage.OK);
      const result = response.data;
      expect(result).toMatchObject(expectedDataNormal);
    });
  });
});
