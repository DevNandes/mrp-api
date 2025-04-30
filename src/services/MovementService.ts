import mongoose from 'mongoose';
import { MovementRepository } from '../repositories/MovementRepository';
import { MaterialService } from './MaterialService';
import { Material } from '../models/Material';

export class MovementService {
  private movRepo = new MovementRepository();
  private matService = new MaterialService();

  async registerMovement(
    data: {
      // Para "in" o campo material pode ser o nome; para "out" e "transfer", precisa ser o id do material.
      material: string;
      type: 'in' | 'out' | 'transfer';
      qty: number;
      depositId?: string;
      depositFromId?: string;
      depositToId?: string;
    }
  ) {
    if (data.type === 'transfer') {
      if (!data.depositFromId || !data.depositToId) {
        throw new Error('Para transferência, informe depositFromId e depositToId');
      }

      // Utiliza o material informado via id (assumindo que já existe)
      const mov = await this.movRepo.create({
        material: new mongoose.Types.ObjectId(data.material),
        type: data.type,
        quantity: data.qty,
        depositFrom: new mongoose.Types.ObjectId(data.depositFromId),
        depositTo: new mongoose.Types.ObjectId(data.depositToId)
      });

      await this.matService.transferQuantity(
        data.material,
        data.depositFromId,
        data.depositToId,
        data.qty
      );

      return mov;
    } else if (data.type === 'out') {
      // No tipo "out" o material deve ser informado por id
      if (!data.depositId) {
        throw new Error('Para saída, informe depositId');
      }

      const mov = await this.movRepo.create({
        material: new mongoose.Types.ObjectId(data.material),
        type: data.type,
        quantity: data.qty,
        deposit: new mongoose.Types.ObjectId(data.depositId)
      });

      const delta = -data.qty;
      await this.matService.adjustQuantity(
        data.material,
        data.depositId,
        delta
      );

      return mov;
    } else if (data.type === 'in') {
      if (!data.depositId) {
        throw new Error('Para entrada, informe depositId');
      }

      let materialId: string;
      // Se material for um id válido, assume que já existe
      if (mongoose.isValidObjectId(data.material)) {
        materialId = data.material;
        const existing = await Material.findOne({ _id: materialId, deposit: new mongoose.Types.ObjectId(data.depositId) });
        if (!existing) {
          throw new Error('Material não encontrado no depósito especificado');
        }
        await this.matService.adjustQuantity(
          materialId,
          data.depositId,
          data.qty
        );
      } else {
        // Caso contrário, trata data.material como o nome do material.
        const existing = await Material.findOne({
          name: data.material,
          deposit: new mongoose.Types.ObjectId(data.depositId)
        });
        if (existing) {
          materialId = (existing._id as mongoose.Types.ObjectId).toString();
          await this.matService.adjustQuantity(
            materialId,
            data.depositId,
            data.qty
          );
        } else {
          const newMat = await this.matService.createMaterial(data.material, data.qty, data.depositId);
          materialId = (newMat._id as mongoose.Types.ObjectId).toString();
        }
      }

      const mov = await this.movRepo.create({
        material: new mongoose.Types.ObjectId(materialId),
        type: data.type,
        quantity: data.qty,
        deposit: new mongoose.Types.ObjectId(data.depositId)
      });

      return mov;
    } else {
      throw new Error('Tipo de movimento inválido');
    }
  }

  async listMovement() {
    return this.movRepo.findAllPopulated();
  }
}