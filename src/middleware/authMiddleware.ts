import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
    if (err) {
      res.status(403).json({ message: 'Token inválido' });
      return;
    }
    req.userId = (payload as any).id;
    next();
  });
};