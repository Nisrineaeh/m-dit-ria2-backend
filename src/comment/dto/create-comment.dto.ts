import { IsInt, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsInt()
    @IsNotEmpty()
    meditationTechniqueId: number;

}
