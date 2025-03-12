import Genially from "../domain/Genially";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";
import { GeniallyDto } from "./dtos/Genially.dto";
import { RenameGeniallyDto } from "./dtos/RenameGenially.dto";
import { ApplicationMapper } from "./mappers/ApplicationMapper";

export default class RenameGeniallyService {
  constructor(private repository: GeniallyRepository) {}
  
  public async execute(id: string, body: RenameGeniallyDto): Promise<GeniallyDto> {
    const genially = await this.repository.find(id);
    
    if(!genially){
      throw new GeniallyNotExist(id);
    }
        
    genially.name = body.name;
    genially.modifiedAt = new Date();
    
    await this.repository.save(genially);
        
    return ApplicationMapper.toDto(genially);
  }
}
