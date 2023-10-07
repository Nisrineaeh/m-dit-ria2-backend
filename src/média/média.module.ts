import { Module } from '@nestjs/common';
import { MédiaService } from './média.service';
import { MédiaController } from './média.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Média } from './entities/média.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Média])],
  controllers: [MédiaController],
  providers: [MédiaService],
})
export class MédiaModule {}
