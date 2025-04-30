import { Request, Response } from 'express';
import { MovementService } from '../services/MovementService';

const movService = new MovementService();

export const registerMovement = async (req: Request, res: Response) => {
  try {
    // Para "in" a propriedade material pode vir como nome; para "out" e "transfer", como id.
    const { material, type, qty, depositId, depositFromId, depositToId } = req.body;
    
    const mov = await movService.registerMovement({
      material,
      type,
      qty,
      depositId,
      depositFromId,
      depositToId
    });
    
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