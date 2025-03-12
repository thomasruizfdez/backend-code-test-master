import mongoose from "mongoose";
import Genially from "../../domain/Genially";

export const GeniallySchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  createdAt: Date,
  modifiedAt: Date,
  deletedAt: Date
});

export const GeniallyModel = mongoose.model<Genially>("Genially", GeniallySchema);