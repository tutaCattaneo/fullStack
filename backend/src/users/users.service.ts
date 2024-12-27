import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
  

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, user: Partial<User>): Promise<User> {
  // Verifica si se incluye una contraseña en la actualización
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  } else {
    // Si no hay contraseña, elimina el campo para evitar sobrescritura
    delete user.password;
  }

  return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
}


  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}