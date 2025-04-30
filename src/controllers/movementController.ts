import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { History } from '../models/History';
import { MovementService } from '../services/MovementService';

const movService = new MovementService();

export const registerMovement = async (req: AuthRequest, res: Response) => {
  try {
    const { material, type, qty, depositId, depositFromId, depositToId } = req.body;
    const mov = await movService.registerMovement({ material, type, qty, depositId, depositFromId, depositToId });
    if (req.userId) {
      await History.create({ description: `Movimento '${type}' de material ${material} quantia ${qty}`, user: req.userId, type: 'create', where: 'movement' });
    }
    res.status(201).json(mov);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const listMovement = async (_req: Request, res: Response) => {
  try {
    const movs = await movService.listMovement();
    res.json(movs);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};