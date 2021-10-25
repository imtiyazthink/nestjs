import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostsDto } from './dto/create.posts.dto';
import { PostsService } from './posts.service';
import { Posts } from './interface/posts.interface';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Get()
    findAll(): Promise<Posts[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Posts> {
        return this.postsService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createPostsDto: CreatePostsDto): Promise<Posts> {
        return this.postsService.create(createPostsDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Posts> {
        return this.postsService.delete(id);
    }

    @Put(':id')
    update(@Body() updatePostsDto: CreatePostsDto, @Param('id') id): Promise<Posts> {
        return this.postsService.update(id, updatePostsDto);
    }
}
