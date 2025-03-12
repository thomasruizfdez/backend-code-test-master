import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RenameGeniallyDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    name: string;
}