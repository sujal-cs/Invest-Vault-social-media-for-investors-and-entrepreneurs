import mongoose, { Document, Schema } from "mongoose";

export interface IStartup extends Document {
  name: string;
  fundingRequired: number;
  equity: number;
}

const StartupSchema: Schema = new Schema({
  name: { type: String, required: true },
  fundingRequired: { type: Number, required: true },
  equity: { type: Number, required: true },
});

export default mongoose.models.Startup || mongoose.model<IStartup>("Startup", StartupSchema);
