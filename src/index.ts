import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import { depositRouter } from './routes/depositRoutes';
import { historyRouter } from './routes/historyRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();
const app = express();
app.use(express.json());
// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRouter);
// Rotas protegidas por JWT
app.use('/deposits', authenticateToken, depositRouter);
app.use('/history', authenticateToken, historyRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`)))
  .catch(err => console.error('Erro ao conectar DB:', err));
