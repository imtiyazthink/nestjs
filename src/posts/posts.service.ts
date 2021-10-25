import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from './interface/posts.interface';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Posts') private readonly postsModel: Model<Posts>) { }

    async findAll(): Promise<Posts[]> {
        let posts = [];
        try {
            posts = await this.postsModel.find();
        } catch (err) {
            throw new HttpException('Please Try Again', HttpStatus.FORBIDDEN)
        }
        if (posts.length === 0) {
            throw new HttpException('No Data Found', HttpStatus.FOUND)
        }
        return posts;
    }

    async findOne(id: string): Promise<Posts> {
        let posts;
        try {
            posts = await this.postsModel.findById({ _id: id });
        } catch (err) {
            throw new HttpException('Posts Not Found', HttpStatus.NOT_FOUND)
        }
        if (!posts) {
            throw new HttpException('Posts Not Found', HttpStatus.NOT_FOUND)
        }
        return posts;
    }

    async create(posts: Posts): Promise<Posts> {
        const newPosts = new this.postsModel(posts);        
        return await newPosts.save();
    }

    async delete(id: string): Promise<Posts> {
        let posts;
        try {
            posts = await this.postsModel.findByIdAndRemove(id);
        } catch (err) {
            throw new HttpException('Posts Not Found', HttpStatus.NOT_FOUND)
        }
        if (!posts) {
            throw new HttpException('Posts Not Found', HttpStatus.NOT_FOUND)
        }
        return posts;
    }

    async update(id: string, posts: Posts): Promise<Posts> {
        let upadtedPosts;
        try {
            upadtedPosts = await this.postsModel.findByIdAndUpdate(id, posts, { new: true });
        } catch (err) {
            throw new HttpException('Posts Not Found', HttpStatus.NOT_FOUND)
        }
        if (!upadtedPosts) {
            throw new HttpException('Posts Not Found', HttpStatus.NOT_FOUND)
        }
        return upadtedPosts
    }
}