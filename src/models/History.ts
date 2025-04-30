import { Schema, model, Document, Types } from 'mongoose';

export interface IHistory extends Document {
  description: string;
  user: Types.ObjectId;
  type: string;
  where: string;
  timestamp: Date;
}

const HistorySchema = new Schema<IHistory>({
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  where: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const History = model<IHistory>('History', HistorySchema);