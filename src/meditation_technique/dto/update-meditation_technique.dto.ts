import { PartialType } from '@nestjs/mapped-types';
import { CreateMeditationTechniqueDto } from './create-meditation_technique.dto';

export class UpdateMeditationTechniqueDto extends PartialType(CreateMeditationTechniqueDto) {}
