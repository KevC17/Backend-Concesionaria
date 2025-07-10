import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { paginateMongo, IPaginationOptions, Pagination } from 'src/common/pagination/paginate-mongo';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User | null> {
    try {
      const createdUser = new this.userModel(dto);
      return await createdUser.save();
    } catch (err) {
      console.error('Error creating user:', err);
      return null;
    }
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<User> | null> {
    try {
      const filter = isActive !== undefined ? { isActive } : {};
      return await paginateMongo<User>(this.userModel, options, filter);
    } catch (err) {
      console.error('Error retrieving users:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (err) {
      console.error('Error finding user:', err);
      return null;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (err) {
      console.error('Error finding user by username:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;

      Object.assign(user, dto);
      return await user.save();
    } catch (err) {
      console.error('Error updating user:', err);
      return null;
    }
  }

  async remove(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;

      await user.deleteOne();
      return user;
    } catch (err) {
      console.error('Error deleting user:', err);
      return null;
    }
  }

  async updateProfile(id: string, filename: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;

      user.profile = filename;
      return await user.save();
    } catch (err) {
      console.error('Error updating user profile:', err);
      return null;
    }
  }
}
