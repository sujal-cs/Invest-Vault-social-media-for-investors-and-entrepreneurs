import mongoose, { Document, Schema } from "mongoose";

export interface IStartupListing extends Document {
  userId: string;
  fundingRequired: number;
  equityOffered: number;
  updatedAt: Date;
}

const StartupListingSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  fundingRequired: { type: Number, required: true },
  equityOffered: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.StartupListing ||
  mongoose.model<IStartupListing>("StartupListing", StartupListingSchema);
