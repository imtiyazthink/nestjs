import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { Posts, PostsSchema } from 'src/posts/schema/posts.schema';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Posts.name, schema: PostsSchema }
  ])], 
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
