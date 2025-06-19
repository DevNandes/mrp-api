import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required: [name, email, password]
 *     responses:
 *       201:
 *         description: Usuário registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password);
    res.status(201).json({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *           example:
 *             email: "user@example.com"
 *             password: "senha123"
 *     responses:
 *       200:
 *         description: Tokens JWT retornados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Erro de credenciais inválidas
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renova tokens JWT usando refreshToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required: [refreshToken]
 *     responses:
 *       200:
 *         description: Novos tokens retornados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Refresh token inválido ou expirado
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refresh(refreshToken);
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout e invalida refreshToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required: [refreshToken]
 *     responses:
 *       200:
 *         description: Logout realizado
 *       400:
 *         description: Refresh token inválido
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ message: 'Logout realizado' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
