import { Router } from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController';

export const authRouter = Router()
  .post('/register', register)
  .post('/login', login)
  .post('/refresh', refreshToken)
  .post('/logout', logout);
