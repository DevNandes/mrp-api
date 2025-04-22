import { Request, Response } from 'express';
import { Material } from '../models/Material';

export const listMaterials = async (_req: Request, res: Response) => {
  const mats = await Material.find();
  res.json(mats);
};

export const createMaterial = async (req: Request, res: Response) => {
  const mat = new Material(req.body);
  await mat.save();
  res.status(201).json(mat);
};
