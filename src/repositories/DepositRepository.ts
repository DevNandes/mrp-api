import { Deposit, IDeposit } from '../models/Deposit';

export class DepositRepository {
  async findAll(filters?: { id?: string; title?: string; description?: string; active?: boolean }): Promise<IDeposit[]> {
    const query: any = {};
    if (filters?.active !== undefined) {
      query.active = filters.active;
    } else {
      query.active = true;
    }
    if (filters?.id) {
      query._id = filters.id;
    }
    if (filters?.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }
    if (filters?.description) {
      query.description = { $regex: filters.description, $options: 'i' };
    }
    return Deposit.find(query);
  }

  async findById(id: string): Promise<IDeposit | null> {
    return Deposit.findById(id);
  }

  async create(data: Partial<IDeposit>): Promise<IDeposit> {
    const dep = new Deposit(data);
    return dep.save();
  }
  
  async update(id: string, data: Partial<IDeposit>): Promise<IDeposit | null> {
    return Deposit.findByIdAndUpdate(id, data, { new: true });
  }

  async markInactive(id: string): Promise<IDeposit | null> {
    return this.update(id, { active: false });
  }
}
