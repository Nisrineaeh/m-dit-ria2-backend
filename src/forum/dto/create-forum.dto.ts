import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";

export class CreateForumDto {
    @IsDate()
    @IsNotEmpty() 
    date: Date;

    @IsString()
    @IsNotEmpty() 
    message: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty() 
    name: string;

    @IsInt()
    @IsNotEmpty() 
    meditation_technique_id: number;

    @IsInt()
    @IsNotEmpty() 
    user_id: number;
}
