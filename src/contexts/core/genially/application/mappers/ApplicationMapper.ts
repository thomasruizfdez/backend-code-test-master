import Genially from "../../domain/Genially";
import { GeniallyDto } from "../dtos/Genially.dto";

export class ApplicationMapper{
  static toDto(genially: Genially): GeniallyDto{
    const dto = new GeniallyDto();
    dto.id = genially.id;
    dto.name = genially.name;
    dto.description = genially.description;
    dto.deletedAt = genially.deletedAt;
    dto.modifedAt = genially.modifiedAt;

    return dto;
  }
}