import mongoose from "mongoose";
import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import { GeniallyModel, GeniallySchema } from "./schemas/genially.schema";

export default class MongoGeniallyRepository implements GeniallyRepository {

  async save(genially: Genially): Promise<void> {
    return await GeniallyModel.create(genially);
  }

  async find(id: string): Promise<Genially> {
    return await GeniallyModel.findById(id);
  }

  async delete(id: string): Promise<void> {
    return await GeniallyModel.findByIdAndDelete(id);
  }
}
