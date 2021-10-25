import { Test, TestingModule } from '@nestjs/testing';
import { Posts } from './interface/posts.interface';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  /**
   * 
   * For returning all the posts data
   */
  const postsData: Posts = {
    id: '1234',
    title: 'test@example.com',
    content: 'test',
    user: '14ssa5'
  }

  /**
   * For Unit Testing, Mocking Providers to test functionality indepndently
   */

  const postsServiceMock = {
    create: jest.fn().mockImplementation((dto) => dto),
    update: jest.fn().mockImplementation((id, dto) => {
      return { id, ...dto };
    }),
    findAll: jest.fn().mockResolvedValue([postsData]),
    findOne: jest.fn().mockResolvedValue(postsData),
    delete: jest.fn().mockResolvedValue(postsData)
  };

  /**
   * Instatiating controllers, providers before testing
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(postsServiceMock)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  /**
   * Verifying controller instantiation
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Create post isolated test
   */
  it('should create a post with given data and return post', () => {
    const postsDto: Posts = {
      title: 'test@example.com',
      content: 'test',
      user: '14ssa5'
    };
    // will call overridden create method
    expect(controller.create(postsDto)).toEqual(postsDto);
  });

  /**
   * Update post isolated test
   */
  it('should update post with given data for provided id and return post', () => {
    const postsDto: Posts = {
      id: '123456',
      title: 'test@example.com',
      content: 'test',
      user: '14ssa5'
    };
    // will call overridden update method
    expect(controller.update(postsDto, postsDto.id)).toEqual(postsDto);
  });

  /**
   * Get Posts
   */
  it('should return all posts', () => {
    expect(controller.findAll()).resolves.toEqual([postsData])
  });

  /**
   * Get Post by id
   */
  it('should return post for the provided post id', () => {
    expect(controller.findOne(postsData.id)).resolves.toEqual(postsData)
  })

  /**
  * Delete Post by id
  */
  it('should return deleted post for the provided post id', () => {
    expect(controller.delete(postsData.id)).resolves.toEqual(postsData)
  })
});
