import { Module } from '@nestjs/common';
import { MédiaService } from './média.service';
import { MédiaController } from './média.controller';

@Module({
  controllers: [MédiaController],
  providers: [MédiaService],
})
export class MédiaModule {}
