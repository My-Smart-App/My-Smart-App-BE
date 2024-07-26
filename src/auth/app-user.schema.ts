import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { AppRole } from './app-role.schema';
import { User } from '../user/user.schema';

@Schema({ collection: 'app_user' })
export class AppUser extends Document {
  @Prop({ required: true, comments: 'username' })
  username: string;

  @Prop({ required: true, comments: 'password' })
  password: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'AppRole' }],
    comments: 'List role of account',
  })
  roles: AppRole[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    unique: true,
    comments: 'User id',
  })
  user: User;
}

export const AppUserSchema = SchemaFactory.createForClass(AppUser);
