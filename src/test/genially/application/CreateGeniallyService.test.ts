import { beforeEach, describe, it } from "node:test";
import CreateGeniallyService from "../../../../src/contexts/core/genially/application/CreateGeniallyService";
import { CreateGeniallyDto } from "../../../../src/contexts/core/genially/application/dtos/CreateGenially.dto";
import { ApplicationMapper } from "../../../../src/contexts/core/genially/application/mappers/ApplicationMapper";
import Genially from "../../../../src/contexts/core/genially/domain/Genially";
import GeniallyRepository from "../../../../src/contexts/core/genially/domain/GeniallyRepository";

// Simple mock of GeniallyRepository
const repositoryMock: jest.Mocked<GeniallyRepository> = {
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

describe("CreateGeniallyService", () => {
  let service: CreateGeniallyService;

  beforeEach(() => {
    service = new CreateGeniallyService(repositoryMock);
  });

  it("Create new genially test", async () => {
    const dto: CreateGeniallyDto = {
      id: "123",
      name: "Test Genially",
      description: "Una descripción de prueba",
    };

    const expectedGenially = new Genially(dto.id, dto.name, dto.description);

    const result = await service.execute(dto);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(expectedGenially);

    expect(result).toEqual(ApplicationMapper.toDto(expectedGenially));
  });
});
