import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MeditationTechniqueService } from './meditation_technique.service';
import { CreateMeditationTechniqueDto } from './dto/create-meditation_technique.dto';
import { UpdateMeditationTechniqueDto } from './dto/update-meditation_technique.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('meditation-technique')
export class MeditationTechniqueController {
  constructor(private readonly meditationTechniqueService: MeditationTechniqueService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMeditationTechniqueDto: CreateMeditationTechniqueDto) {
    return this.meditationTechniqueService.create(createMeditationTechniqueDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.meditationTechniqueService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.meditationTechniqueService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateMeditationTechniqueDto: UpdateMeditationTechniqueDto) {
    return this.meditationTechniqueService.update(+id, updateMeditationTechniqueDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.meditationTechniqueService.remove(+id);
  }
}
