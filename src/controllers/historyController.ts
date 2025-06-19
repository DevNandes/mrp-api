import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { History } from '../models/History';

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Lista histórico de operações
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: where
 *         schema:
 *           type: string
 *         description: Filtra pelo local da ação (e.g., 'deposit')
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtra pelo tipo de ação (create, modify, delete)
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filtra pelo ID do usuário
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data mínima (início) para filtrar
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data máxima (fim) para filtrar
 *     responses:
 *       200:
 *         description: Lista de históricos retornada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History'
 */
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