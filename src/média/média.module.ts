import { Module } from '@nestjs/common';
import { MédiaService } from './média.service';
import { MédiaController } from './média.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Média } from './entities/média.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Média]),
    MulterModule.register({
      dest: './uploads',
    })],
  controllers: [MédiaController],
  providers: [MédiaService],
})
export class MédiaModule {}
