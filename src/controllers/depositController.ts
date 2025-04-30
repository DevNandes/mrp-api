import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { History } from '../models/History';
import { DepositService } from '../services/DepositService';

const depService = new DepositService();

export const listDeposits = async (req: Request, res: Response, next: NextFunction) => {
  const { id, title, description, active } = req.query;
  const filters: any = {};
  if (id) filters.id = String(id);
  if (title) filters.title = String(title);
  if (description) filters.description = String(description);
  if (active !== undefined) filters.active = String(active) === 'true';
  const deps = await depService.list(filters);
  res.json(deps);
};

export const createDeposit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const dep = await depService.create(title, description);
  if (req.userId) {
    await History.create({ description: `Depósito '${title}' criado`, user: req.userId, type: 'create', where: 'deposit' });
  }
  res.status(201).json(dep);
};

export const updateDeposit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const dep = await depService.update(id, title, description);
  if (!dep) return res.status(404).json({ message: 'Depósito não encontrado' });
  if (req.userId) {
    await History.create({ description: `Depósito '${dep.title}' atualizado`, user: req.userId, type: 'modify', where: 'deposit' });
  }
  res.json(dep);
};

export const deleteDeposit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const dep = await depService.markInactive(id);
  if (!dep) return res.status(404).json({ message: 'Depósito não encontrado' });
  if (req.userId) {
    await History.create({ description: `Depósito '${dep.title}' inativado`, user: req.userId, type: 'delete', where: 'deposit' });
  }
  res.json({ message: 'Depósito inativado' });
};
