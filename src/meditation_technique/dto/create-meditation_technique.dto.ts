import { Média } from "src/média/entities/média.entity";
import { User } from "src/user/entities/user.entity";

export class CreateMeditationTechniqueDto {
    name: string;
    description: string;
    atmosphere: string;
    duration: number;
    keyword: string;
    user_id: User;
    audio_media_id:  Média;
    visual_media_id:  Média;
}
