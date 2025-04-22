import { Router } from 'express';
import { listMaterials, createMaterial } from '../controllers/materialController';

export const materialRouter = Router()
  .get('/',   listMaterials)
  .post('/',  createMaterial);
