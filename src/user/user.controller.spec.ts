import { Test, TestingModule } from '@nestjs/testing';
import { User } from './interface/user.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;

    /**
     * 
     * For returning all the users data
     */
    const userData: User = {
        id: '1234',
        email: 'test@example.com',
        name: 'test',
        address: 'test'
    }

    /**
     * For Unit Testing, Mocking Providers to test functionality indepndently
     */

    const userServiceMock = {
        create: jest.fn().mockImplementation((dto) => dto),
        update: jest.fn().mockImplementation((id, dto) => {
            return { id, ...dto };
        }),
        findAll: jest.fn().mockResolvedValue([userData]),
        findOne: jest.fn().mockResolvedValue(userData),
        delete: jest.fn().mockResolvedValue(userData)
    };

    /**
     * Instatiating controllers, providers before testing
     */
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(userServiceMock)
            .compile();

        controller = module.get<UserController>(UserController);
    });

    /**
     * Verifying controller instantiation
     */
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    /**
     * Create user isolated test
     */
    it('should create a user with given data and return user', () => {
        const userDto: User = {
            name: 'first user',
            email: 'test@test.com',
            address: 'test road'
        };
        // will call overridden create method
        expect(controller.create(userDto)).toEqual(userDto);
    });

    /**
     * Update user isolated test
     */
    it('should update a user with given data for provided id and return user', () => {
        const userDto: User = {
            id: '123456',
            name: 'second user',
            email: 'test@test.com',
            address: 'test road'
        };
        // will call overridden update method
        expect(controller.update(userDto, userDto.id)).toEqual(userDto);
    });

    /**
     * Get users
     */
    it('should return all user', () => {
        expect(controller.findAll()).resolves.toEqual([userData])
    });

    /**
     * Get user by id
     */
    it('should return user for the provided user id', () => {
        expect(controller.findOne(userData.id)).resolves.toEqual(userData)
    })

    /**
    * Delete user by id
    */
    it('should return deleted user for the provided user id', () => {
        expect(controller.delete(userData.id)).resolves.toEqual(userData)
    })
});
