import { Module } from '@nestjs/common';
import { MeditationTechniqueService } from './meditation_technique.service';
import { MeditationTechniqueController } from './meditation_technique.controller';
import { MeditationTechnique } from './entities/meditation_technique.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from 'src/forum/entities/forum.entity';
import { MédiaModule } from 'src/média/média.module';
import { Média } from 'src/média/entities/média.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeditationTechnique, Forum, Média, User])],
  controllers: [MeditationTechniqueController],
  providers: [MeditationTechniqueService],
  exports: [TypeOrmModule.forFeature([MeditationTechnique])]
})
export class MeditationTechniqueModule { }
