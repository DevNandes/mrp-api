import express from 'express';
import { connectDB } from './config/db';
import { materialRouter } from './routes/materialRoutes';
import { movementRouter } from './routes/movementRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/materials', materialRouter);
app.use('/movements', movementRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`)))
  .catch(err => console.error('Erro ao conectar DB:', err));
