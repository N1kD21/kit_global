import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  _id: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  definition: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
