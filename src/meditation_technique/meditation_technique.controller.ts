import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeditationTechniqueService } from './meditation_technique.service';
import { CreateMeditationTechniqueDto } from './dto/create-meditation_technique.dto';
import { UpdateMeditationTechniqueDto } from './dto/update-meditation_technique.dto';

@Controller('meditation-technique')
export class MeditationTechniqueController {
  constructor(private readonly meditationTechniqueService: MeditationTechniqueService) {}

  @Post()
  create(@Body() createMeditationTechniqueDto: CreateMeditationTechniqueDto) {
    return this.meditationTechniqueService.create(createMeditationTechniqueDto);
  }

  @Get()
  findAll() {
    return this.meditationTechniqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meditationTechniqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeditationTechniqueDto: UpdateMeditationTechniqueDto) {
    return this.meditationTechniqueService.update(+id, updateMeditationTechniqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meditationTechniqueService.remove(+id);
  }
}
