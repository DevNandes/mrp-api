import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { History } from '../models/History';
import { MaterialService } from '../services/MaterialService';

const matService = new MaterialService();

export const createMaterial = async (req: AuthRequest, res: Response) => {
  const { name, quantity, depositId } = req.body;
  const mat = await matService.createMaterial(name, quantity, depositId);
  if (req.userId) {
    await History.create({ description: `Material '${name}' criado no depósito ${depositId}`, user: req.userId, type: 'create', where: 'material' });
  }
  res.status(201).json(mat);
};

export const listMaterials = async (_req: Request, res: Response) => {
  const mats = await matService.listMaterials();
  res.json(mats);
};
