import { Injectable } from '@nestjs/common';
import { CreateMeditationTechniqueDto } from './dto/create-meditation_technique.dto';
import { UpdateMeditationTechniqueDto } from './dto/update-meditation_technique.dto';

@Injectable()
export class MeditationTechniqueService {
  create(createMeditationTechniqueDto: CreateMeditationTechniqueDto) {
    return 'This action adds a new meditationTechnique';
  }

  findAll() {
    return `This action returns all meditationTechnique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meditationTechnique`;
  }

  update(id: number, updateMeditationTechniqueDto: UpdateMeditationTechniqueDto) {
    return `This action updates a #${id} meditationTechnique`;
  }

  remove(id: number) {
    return `This action removes a #${id} meditationTechnique`;
  }
}
