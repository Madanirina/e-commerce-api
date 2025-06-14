import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { Types } from 'mongoose';
import { CloudinaryService } from '../../cloudinary/clodinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('/signup')
  async createUser(@Body() user: User): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hashedPassword;
    return this.userService.createUser(user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image) {
    return await this.cloudinaryService.uploadImage(image);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: Types.ObjectId,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getUserByUsername(@Query('username') username: string) {
    return this.userService.getUserByUsername(username);
  }
}
