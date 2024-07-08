// src/users/user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  created_at: Date;

  @Prop({ default: Date.now, comments: 'Time of updated' })
  updated_by: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
