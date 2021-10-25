import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from 'src/posts/posts.controller';
import { PostsService } from 'src/posts/posts.service';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Posts, PostsSchema } from './schema/posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Posts.name, schema: PostsSchema }
    ])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule { }
