import { Response, Request } from "express";
import { CreateGeniallyDto } from "../../contexts/core/genially/application/dtos/CreateGenially.dto";
import { validate } from "class-validator";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import { RenameGeniallyDto } from "../../contexts/core/genially/application/dtos/RenameGenially.dto";

export class GeniallyController {
  createService: CreateGeniallyService;
  deleteService: DeleteGeniallyService;
  renameService: RenameGeniallyService;
  
  constructor(
    createGeniallyService: CreateGeniallyService, 
    deleteGeniallyService: DeleteGeniallyService, 
    renameGeniallyService: RenameGeniallyService){
      this.createService = createGeniallyService;
      this.deleteService = deleteGeniallyService;
      this.renameService = renameGeniallyService;
  }

  async create (req: Request, res: Response) {
    try{
      const createDto = new CreateGeniallyDto();

      createDto.id = req.body?.id;
      createDto.name = req.body?.name;
      createDto.description = req.body?.description;

      await this.validateDto(createDto);
      
      const geniallyDto = await this.createService.execute(createDto);

      res.status(200).send( geniallyDto );
    } catch(error) {
      res.status(500).send( error );
    }
  };

  async delete (req: Request, res: Response) {
    try{
      const geniallyDto = await this.deleteService.execute(req.params?.id);

      res.status(200).send( geniallyDto );
    } catch(error) {
      res.status(500).send( error );
    }
  };

  async rename (req: Request, res: Response) {
    try{
      const renameDto = new RenameGeniallyDto();

      renameDto.name = req.body?.name;

      await this.validateDto(renameDto);

      const geniallyDto = await this.renameService.execute(req.params?.id, renameDto);

      res.status(200).send( geniallyDto );
    } catch(error) {
      res.status(500).send( error );
    }
  };

  private async validateDto(dto: any){
    const errors = await validate(dto);

    if(errors.length){
      throw new Error('Validation errors: ' + JSON.stringify(errors));
    }
  }
}