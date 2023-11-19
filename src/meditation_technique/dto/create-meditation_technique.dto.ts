import { IsInt, IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";
import { Média } from "src/média/entities/média.entity";
import { User } from "src/user/entities/user.entity";

export class CreateMeditationTechniqueDto {

    @IsString()
    @MaxLength(255)
    @IsNotEmpty() 
    name: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    description: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    atmosphere: string;

    @IsInt()
    @IsNotEmpty()
    duration: number;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    keyword: string;

    @IsNotEmpty()
    user_id: User;

    @IsNotEmpty()
    audio_media_id:  Média;

    @IsNotEmpty()
    visual_media_id:  Média;
}
