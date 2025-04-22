import { Schema, model, Document } from 'mongoose';

export interface IMovement extends Document {
  material: Schema.Types.ObjectId;
  type: 'in' | 'out';
  quantity: number;
  date: Date;
}

const MovementSchema = new Schema<IMovement>({
  material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
  type:    { type: String, enum: ['in','out'], required: true },
  quantity:{ type: Number, required: true },
  date:    { type: Date, default: Date.now }
});

export const StockMovement = model<IMovement>('StockMovement', MovementSchema);
