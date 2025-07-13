import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: false })
  profile?: string;

  @Prop({ required: true, enum: ['USER', 'ADMIN'], default: 'USER' })
  role: 'USER' | 'ADMIN';
}

export const UserSchema = SchemaFactory.createForClass(User);