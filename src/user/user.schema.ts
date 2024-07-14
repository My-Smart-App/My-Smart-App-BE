// src/users/user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AppUser } from 'src/auth/app-user.schema';

@Schema({ collection: 'user' })
export class User extends Document {
  @Prop({ required: true, comments: 'Username of the user.' })
  name: string;

  @Prop({ comments: 'Age of the user.' })
  age: number;

  @Prop({ comments: 'Email address of the user.' })
  email: string;

  @Prop({ comments: 'Description or bio of the user.' })
  description: string;

  @Prop({ default: Date.now, comments: 'Time of created' })
  createdAt: Date;

  @Prop({ default: Date.now, comments: 'Time of updated' })
  updatedAt: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'AppUser',
    unique: true,
  })
  role: AppUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
