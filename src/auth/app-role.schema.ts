import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { AppUser } from './app-user.schema';

@Schema({ collection: 'app_role' })
export class AppRole extends Document {
  @Prop({ required: true, comments: 'Role name' })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'AppUser' }],
    comments: 'List Role',
  })
  users: AppUser[];
}

export const AppRoleSchema = SchemaFactory.createForClass(AppRole);
