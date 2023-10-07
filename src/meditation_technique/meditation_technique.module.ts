import { Module } from '@nestjs/common';
import { MeditationTechniqueService } from './meditation_technique.service';
import { MeditationTechniqueController } from './meditation_technique.controller';
import { MeditationTechnique } from './entities/meditation_technique.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from 'src/forum/entities/forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeditationTechnique, Forum])],
  controllers: [MeditationTechniqueController],
  providers: [MeditationTechniqueService],
})
export class MeditationTechniqueModule {}
