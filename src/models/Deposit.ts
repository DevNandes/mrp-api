import { Schema, model, Document } from 'mongoose';

export interface IDeposit extends Document {
  title: string;
  description: string;
  active: boolean;
}

const DepositSchema = new Schema<IDeposit>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Deposit = model<IDeposit>('Deposit', DepositSchema);
