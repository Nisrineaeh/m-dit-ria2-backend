import { IsInt, IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";

export class CreateMédiaDto {

    @IsString()
    @MaxLength(255)
    @IsNotEmpty() 
    name: string;

    @IsString()
    @MaxLength(60)
    @IsNotEmpty() 
    mimetype: string;

    @IsInt()
    @IsNotEmpty() 
    size: number;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty() 
    description: string;

    @IsInt()
    @IsNotEmpty()
    user_id:number;
}
