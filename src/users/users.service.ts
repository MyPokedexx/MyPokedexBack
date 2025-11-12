import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Trouve un utilisateur par email (utilisé par AuthService)
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Crée un nouvel utilisateur (le mot de passe doit déjà être hashé par AuthService)
  async create(createUserDto: any) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  // Récupère tous les utilisateurs (sans mot de passe)
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password').exec();
    return users as unknown as User[];
  }

  // Récupère un utilisateur par son id (sans mot de passe)
  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).select('-password').exec();
    return user as unknown as User | null;
  }

  // Met à jour un utilisateur par id (retourne le document mis à jour sans mot de passe)
  async update(id: string, data: UpdateUserDto): Promise<User | null> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .select('-password')
      .exec();
    return updated as unknown as User | null;
  }

  // Supprime un utilisateur par id (retourne l'utilisateur supprimé sans mot de passe)
  async delete(id: string): Promise<User | null> {
    const deleted = await this.userModel
      .findByIdAndDelete(id)
      .select('-password')
      .exec();
    return deleted as unknown as User | null;
  }
}
