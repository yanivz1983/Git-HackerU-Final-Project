import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 24 * 3600 * 1000), // Expires after 24 hours
    required: true,
  },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);

export { Token };
