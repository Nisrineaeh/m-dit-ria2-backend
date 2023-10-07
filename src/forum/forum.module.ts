import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { MeditationTechnique } from 'src/meditation_technique/entities/meditation_technique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, MeditationTechnique])],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
