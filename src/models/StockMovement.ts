import { Schema, model, Document, Types } from 'mongoose';

export interface IMovement extends Document {
  material: Types.ObjectId;
  type: 'in' | 'out' | 'transfer';
  quantity: number;
  deposit?: Types.ObjectId;
  depositFrom?: Types.ObjectId;
  depositTo?: Types.ObjectId;
  date: Date;
}

const MovementSchema = new Schema<IMovement>({
  material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
  type:     { type: String, enum: ['in', 'out', 'transfer'], required: true },
  quantity: { type: Number, required: true },
  deposit:    { type: Schema.Types.ObjectId, ref: 'Deposit' },
  depositFrom: { type: Schema.Types.ObjectId, ref: 'Deposit' },
  depositTo:   { type: Schema.Types.ObjectId, ref: 'Deposit' },
  date:     { type: Date, default: Date.now }
});

export const StockMovement = model<IMovement>('StockMovement', MovementSchema);