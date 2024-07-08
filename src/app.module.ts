import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CookieMiddleware } from './middleware/cookie.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './user/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),

  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieMiddleware)
      .forRoutes('*');  
  }
}
