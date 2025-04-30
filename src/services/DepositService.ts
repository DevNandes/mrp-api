import { DepositRepository } from '../repositories/DepositRepository';
import { IDeposit } from '../models/Deposit';

export class DepositService {
  private repo = new DepositRepository();

  async list(filters?: { id?: string; title?: string; description?: string; active?: boolean }): Promise<IDeposit[]> {
    return this.repo.findAll(filters);
  }

  async create(title: string, description: string): Promise<IDeposit> {
    // opcional: checar duplicados
    return this.repo.create({ title, description });
  }
  
  async update(id: string, title: string, description: string): Promise<IDeposit | null> {
    return this.repo.update(id, { title, description });
  }

  async markInactive(id: string): Promise<IDeposit | null> {
    return this.repo.markInactive(id);
  }
}
