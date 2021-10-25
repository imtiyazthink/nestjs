import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema()
export class Posts extends Document {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
