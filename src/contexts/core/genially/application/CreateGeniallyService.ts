import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import { CreateGeniallyDto } from "./dtos/CreateGenially.dto";
import { GeniallyDto } from "./dtos/Genially.dto";
import { ApplicationMapper } from "./mappers/ApplicationMapper";

export default class CreateGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(body: CreateGeniallyDto): Promise<GeniallyDto> {
    const { id, name, description } = body;

    const genially = new Genially(id, name, description);

    await this.repository.save(genially);

    return ApplicationMapper.toDto(genially);
  }
}
