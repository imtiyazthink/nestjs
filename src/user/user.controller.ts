import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interface/user.interface';

@Controller('user')
export class UserController {
    constructor(@Inject(forwardRef(() => UserService))
    private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.userService.delete(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
}
