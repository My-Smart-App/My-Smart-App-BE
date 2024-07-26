import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { HttpMessage } from '../src/common/enum/http-status';
import { User } from '../src/user/user.schema';

const mockFindAllUser: User[] = [
  {
    name: 'Test User',
    age: 25,
    email: 'test@example.com',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
    appUser: new Types.ObjectId() as any,
  } as unknown as User,
];

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('findAllUser', () => {
    it('should return an MSAResponse with an array of users', async () => {
      const data: User[] = mockFindAllUser;

      jest.spyOn(userService, 'findAll').mockResolvedValue(data);

      const response = await userController.findAllUser();

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.message).toBe(HttpMessage.OK);
      expect(response.data).toBe(data);
    });
  });
});
