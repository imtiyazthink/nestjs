import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    user: string;
  }
  