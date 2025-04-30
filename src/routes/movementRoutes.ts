import { Router } from 'express';
import { registerMovement, listMovement } from '../controllers/movementController';

export const movementRouter = Router()
  .get('/', listMovement)
  .post('/', registerMovement);
