import mongoose from 'mongoose';
import { MaterialRepository } from '../repositories/MaterialRepository';
import { DepositRepository }  from '../repositories/DepositRepository';
import { Material } from '../models/Material';

export class MaterialService {
  private matRepo = new MaterialRepository();
  private depRepo = new DepositRepository();

  async createMaterial(name: string, qty: number, depositId: string) {
    const dep = await this.depRepo.findById(depositId);
    if (!dep) throw new Error('Depósito não encontrado');

    return this.matRepo.create({
      name,
      quantity: qty,
      deposit: new mongoose.Types.ObjectId(depositId)
    });
  }

  async listMaterials() {
    return this.matRepo.findAllPopulated();
  }

  async adjustQuantity(materialId: string, depositId: string, delta: number) {
    // Procura o material no depósito informado
    const mat = await Material.findOne({ _id: materialId, deposit: depositId });
    if (!mat) {
      throw new Error('Material não encontrado no depósito especificado');
    }

    mat.quantity += delta;
    await mat.save();
  }

  async transferQuantity(
    materialId: string,
    depositFromId: string,
    depositToId: string,
    qty: number
  ) {
    // Retira a quantidade do depósito de origem
    const matFrom = await Material.findOne({ _id: materialId, deposit: depositFromId });
    if (!matFrom) {
      throw new Error('Material não encontrado no depósito de origem');
    }
    if (matFrom.quantity < qty) {
      throw new Error('Quantidade insuficiente para transferência');
    }

    matFrom.quantity -= qty;
    await matFrom.save();

    // Adiciona a quantidade no depósito de destino
    let matTo = await Material.findOne({ _id: materialId, deposit: depositToId });
    if (!matTo) {
      // Caso o material ainda não exista no depósito de destino, cria um novo registro
      matTo = new Material({
        name: matFrom.name,
        quantity: qty,
        deposit: depositToId
      });
    } else {
      matTo.quantity += qty;
    }
    await matTo.save();
  }
}