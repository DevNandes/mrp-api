import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { History } from '../models/History';
import { DepositService } from '../services/DepositService';

const depService = new DepositService();

/**
 * @swagger
 * /deposits:
 *   get:
 *     summary: Lista depósitos
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filtra por ID do depósito
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtra por título (regex)
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filtra por descrição (regex)
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtra por status ativo/inativo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de depósitos retornada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deposit'
 */
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

/**
 * @swagger
 * /deposits:
 *   post:
 *     summary: Cria um novo depósito
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Depósito criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deposit'
 */
export const createDeposit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const dep = await depService.create(title, description);
  if (req.userId) {
    await History.create({ description: `Depósito '${title}' criado`, user: req.userId, type: 'create', where: 'deposit' });
  }
  res.status(201).json(dep);
};

/**
 * @swagger
 * /deposits/{id}:
 *   put:
 *     summary: Atualiza um depósito existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do depósito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Depósito atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deposit'
 *       404:
 *         description: Depósito não encontrado
 */
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

/**
 * @swagger
 * /deposits/{id}:
 *   delete:
 *     summary: Marca um depósito como inativo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do depósito
 *     responses:
 *       200:
 *         description: Depósito inativado
 */
export const deleteDeposit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const dep = await depService.markInactive(id);
  if (!dep) return res.status(404).json({ message: 'Depósito não encontrado' });
  if (req.userId) {
    await History.create({ description: `Depósito '${dep.title}' inativado`, user: req.userId, type: 'delete', where: 'deposit' });
  }
  res.json({ message: 'Depósito inativado' });
};
