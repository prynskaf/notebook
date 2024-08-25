import mongoose, { Document, Model, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  codeSample: string;
  user: string; // The userId should be a string
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema: Schema<INote> = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  codeSample: { type: String, required: false },
  user: { type: String, ref: "User", required: true }, // Store userId as a string
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Note: Model<INote> =
  mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
