import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateWordDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly value: string;    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly hint: string;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly transliteration: string;
}