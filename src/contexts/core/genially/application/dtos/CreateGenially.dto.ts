import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateGeniallyDto  {
    @IsNotEmpty()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(125)
    @IsNotEmpty()
    description: string;
}