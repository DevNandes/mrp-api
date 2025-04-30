import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }
}, { timestamps: { createdAt: true, updatedAt: false } });

export const User = model<IUser>('User', UserSchema);
