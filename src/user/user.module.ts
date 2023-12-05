import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MeditationTechnique } from 'src/meditation_technique/entities/meditation_technique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MeditationTechnique])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
