import { Router } from 'express';
import { listHistory } from '../controllers/historyController';

export const historyRouter = Router()
  .get('/', listHistory);
