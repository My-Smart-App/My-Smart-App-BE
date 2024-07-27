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

const mockCreatedAt = new Date();
const mockUpdatedAt = new Date();
const mockAppUser = new Types.ObjectId();

const mockUser = [
  {
    name: 'Test User',
    age: 25,
    email: 'test@example.com',
    description: 'Test Description',
    createdAt: mockCreatedAt,
    updatedAt: mockUpdatedAt,
    appUser: mockAppUser,
  },
];

const expectedDatasNormal = [
  {
    name: 'Test User',
    age: 25,
    email: 'test@example.com',
    description: 'Test Description',
    createdAt: mockCreatedAt,
    updatedAt: mockUpdatedAt,
    appUser: mockAppUser,
  },
];

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
    await userModel.insertMany(mockUser);
  });

  describe('findAllUser', () => {
    const detailNormal: string = `**CASE NORMAL** 
        Should return an MSAResponse with an array of users`;

    it(detailNormal, async () => {
      const response = await userController.findAllUser();

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.message).toBe(HttpMessage.OK);
      const result = response.data;
      expect(result).toHaveLength(expectedDatasNormal.length);

      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toMatchObject(expectedDatasNormal[i]);
      }
    });

    const detailNoData = `**NO DATA** 
        Should return an MSAResponse with an empty array`;

    it(detailNoData, async () => {
      await userModel.deleteMany({});
      const response = await userController.findAllUser();

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.message).toBe(HttpMessage.OK);
      const result = response.data;
      expect(result).toHaveLength(0);
    });
  });
});
