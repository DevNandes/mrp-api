import { Router } from 'express';
import { registerMovement } from '../controllers/movementController';

export const movementRouter = Router()
  .post('/', registerMovement);
