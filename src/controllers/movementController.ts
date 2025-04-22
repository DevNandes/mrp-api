import { Request, Response } from 'express';
import { StockMovement } from '../models/StockMovement';
import { Material } from '../models/Material';

export const registerMovement = async (req: Request, res: Response) => {
  const { material, type, quantity } = req.body;
  const mov = new StockMovement({ material, type, quantity });
  await mov.save();

  // Atualiza estoque
  const delta = type === 'in' ? quantity : -quantity;
  await Material.findByIdAndUpdate(material, { $inc: { quantity: delta } });

  res.status(201).json(mov);
};
