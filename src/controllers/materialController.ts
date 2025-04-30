import { Request, Response } from 'express';
import { MaterialService } from '../services/MaterialService';

const matService = new MaterialService();

export const createMaterial = async (req: Request, res: Response) => {
  const { name, quantity, depositId } = req.body;
  const mat = await matService.createMaterial(name, quantity, depositId);
  res.status(201).json(mat);
};

export const listMaterials = async (_req: Request, res: Response) => {
  const mats = await matService.listMaterials();
  res.json(mats);
};
