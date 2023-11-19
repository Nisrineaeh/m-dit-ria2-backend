import { IsInt, IsNotEmpty } from "@nestjs/class-validator";

export class CreateFavoriteDto {
    @IsInt()
    @IsNotEmpty() 
    userId: number;

    @IsInt()
    @IsNotEmpty() 
    meditationTechniqueId: number;
}
