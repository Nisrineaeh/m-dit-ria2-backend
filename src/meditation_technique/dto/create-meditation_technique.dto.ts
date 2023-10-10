import { Média } from "src/média/entities/média.entity";
import { User } from "src/user/entities/user.entity";

export class CreateMeditationTechniqueDto {
    name: string;
    description: string;
    atmosphere: string;
    duration: number;
    keyword: string;
    user_id:number;
    audio_media_id: number;
    visual_media_id: number;
}
