import { User, IUser } from '../models/User';

export class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async updateRefreshToken(id: string, token: string | null): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { refreshToken: token }, { new: true });
  }

  async findByRefreshToken(token: string): Promise<IUser | null> {
    return User.findOne({ refreshToken: token });
  }
}