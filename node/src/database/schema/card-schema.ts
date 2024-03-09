import { Schema, Document } from "mongoose";
import { ICard } from "../../@types/card";
import { imageSchema } from "./image-schema";
import { Logger } from "../../logs/logger";

async function addDollarSign(this: ICard & Document, next: () => void) {
  Logger.log("Middleware addDollarSign is called");

  Logger.log("Original price:", this.price);
  Logger.log("Original shipping:", this.shipping);

  const formatIfValid = (value: any) => {
    if (typeof value === "string") {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
      if (!isNaN(numericValue)) {
        const formattedValue = `$${numericValue
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        return formattedValue;
      }
    }
    return value;
  };

  this.price = formatIfValid(this.price);
  this.shipping = formatIfValid(this.shipping);

  Logger.log("Formatted price:", this.price);
  Logger.log("Formatted shipping:", this.shipping);

  next();
}

const cardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String, required: true },
  shipping: { type: String, required: true },
  images: [{ type: imageSchema }],
  userId: { type: String, required: true },
  bizNumber: {
    type: Number,
    required: false,
    default: () => Math.round(Math.random() * 1_000_000),
    unique: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  likes: [
    {
      type: String,
    },
  ],
});

cardSchema.pre("save", addDollarSign);
cardSchema.pre("updateOne", addDollarSign);

export { cardSchema, addDollarSign };
