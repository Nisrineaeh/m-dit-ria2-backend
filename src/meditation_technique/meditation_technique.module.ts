import { Module } from '@nestjs/common';
import { MeditationTechniqueService } from './meditation_technique.service';
import { MeditationTechniqueController } from './meditation_technique.controller';

@Module({
  controllers: [MeditationTechniqueController],
  providers: [MeditationTechniqueService],
})
export class MeditationTechniqueModule {}
