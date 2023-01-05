import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateLessonDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly title: string;    
    @IsNumber()  
    @IsNotEmpty()
    readonly order_num: number;
    @IsString()
    readonly letters: string[];
}