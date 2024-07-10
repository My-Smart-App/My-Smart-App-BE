import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MSAMiddleware } from './middleware/msa.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './user/user.schema';
import { AppUser, AppUserSchema } from './auth/app-user.schema';
import { AppRole, AppRoleSchema } from './auth/app-role.schema';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AppUser.name, schema: AppUserSchema },
      { name: AppRole.name, schema: AppRoleSchema },
    ]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MSAMiddleware).forRoutes('*');
  }
}
