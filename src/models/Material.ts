import { Schema, model, Document } from 'mongoose';

export interface IMaterial extends Document {
  name: string;
  quantity: number;
  createdAt: Date;
}

const MaterialSchema = new Schema<IMaterial>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
}, { timestamps: { createdAt: true, updatedAt: false } });

export const Material = model<IMaterial>('Material', MaterialSchema);
