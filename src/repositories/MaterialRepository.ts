// src/repositories/MaterialRepository.ts
import { Material, IMaterial } from '../models/Material';

export class MaterialRepository {
  async findAll(): Promise<IMaterial[]> {
    return Material.find();
  }
  async findAllPopulated(): Promise<IMaterial[]> {
    return Material.find().populate('deposit', 'name');
  }
  async create(data: Partial<IMaterial>): Promise<IMaterial> {
    const mat = new Material(data);
    return mat.save();
  }
}
