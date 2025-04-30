import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { History } from '../models/History';

export const listHistory = async (req: AuthRequest, res: Response) => {
  const { where, type, user, from, to } = req.query;
  const query: any = {};
  if (where) query.where = String(where);
  if (type) query.type = String(type);
  if (user) query.user = String(user);
  if (from || to) {
    query.timestamp = {};
    if (from) query.timestamp.$gte = new Date(String(from));
    if (to)   query.timestamp.$lte = new Date(String(to));
  }
  const histories = await History.find(query).sort({ timestamp: -1 }).populate('user', 'name');
  res.json(histories);
};