import { Router } from 'express';
import { listDeposits, createDeposit, updateDeposit, deleteDeposit } from '../controllers/depositController';

export const depositRouter = Router()
  .get('/', listDeposits)
  .post('/', createDeposit)
  .put('/:id', updateDeposit)
  .delete('/:id', deleteDeposit);
