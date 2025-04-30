import { StockMovement, IMovement } from '../models/StockMovement';

export class MovementRepository {
  async create(data: Partial<IMovement>): Promise<IMovement> {
    const mov = new StockMovement(data);
    return mov.save();
  }

  async findAllPopulated(): Promise<IMovement[]> {
    return StockMovement.find()
      .populate('material', 'type quantity')
      .populate('deposit')
      .populate('depositFrom')
      .populate('depositTo');
  }
}