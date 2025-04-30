import { Schema, model, Document, Types } from 'mongoose';

export interface IMaterial extends Document {
  name: string;
  quantity: number;
  deposit: Types.ObjectId;
  createdAt: Date;
}

const MaterialSchema = new Schema<IMaterial>({
  name:     { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  deposit:  { type: Schema.Types.ObjectId, ref: 'Deposit', required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

export const Material = model<IMaterial>('Material', MaterialSchema);
