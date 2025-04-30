import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/User';

const SALT_ROUNDS = 10;

export class AuthService {
  private userRepo = new UserRepository();

  async register(email: string, password: string): Promise<IUser> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email já cadastrado');
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return this.userRepo.create({ email, password: hash });
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Credenciais inválidas');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Credenciais inválidas');
    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
    await this.userRepo.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async refresh(token: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET as string) as { id: string };
    const user = await this.userRepo.findByRefreshToken(token);
    if (!user) throw new Error('Token inválido');
    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '30m' });
    const newRefresh = jwt.sign(payload, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
    await this.userRepo.updateRefreshToken(user.id, newRefresh);
    return { accessToken, refreshToken: newRefresh };
  }

  async logout(token: string): Promise<void> {
    const user = await this.userRepo.findByRefreshToken(token);
    if (!user) throw new Error('Token inválido');
    await this.userRepo.updateRefreshToken(user.id, null);
  }
}
