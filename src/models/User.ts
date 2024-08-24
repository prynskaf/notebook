import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  subscriptionPlan: string;
  subscriptionExpiresAt: Date | null;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'team'],
    default: 'free',
  },
  subscriptionExpiresAt: { type: Date, default: null },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
