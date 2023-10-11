import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MeditationTechniqueService } from './meditation_technique.service';
import { CreateMeditationTechniqueDto } from './dto/create-meditation_technique.dto';
import { UpdateMeditationTechniqueDto } from './dto/update-meditation_technique.dto';
import { AuthGuard } from '@nestjs/passport';
import { MeditationTechnique } from './entities/meditation_technique.entity';

@Controller('meditation-technique')
export class MeditationTechniqueController {
  constructor(private readonly meditationTechniqueService: MeditationTechniqueService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMeditationTechniqueDto: CreateMeditationTechniqueDto) {
    console.log('CONTROLLER', createMeditationTechniqueDto)
    return this.meditationTechniqueService.create(createMeditationTechniqueDto);
  }

  // @Post('with-media')
  // @UseGuards(AuthGuard('jwt'))
  // createWithMedia(@Body() createMeditationTechniqueDto: CreateMeditationTechniqueDto) {
  //   return this.meditationTechniqueService.createWithMedia(createMeditationTechniqueDto);
  // }

  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // async create(@Body() createMeditationTechniqueDto: CreateMeditationTechniqueDto) {
  //   if (createMeditationTechniqueDto.user_id) {
      
  //     return this.meditationTechniqueService.createWithMedia(createMeditationTechniqueDto);
  //   } else if (createMeditationTechniqueDto.audio_media_id && createMeditationTechniqueDto.visual_media_id) {
      
  //     return this.meditationTechniqueService.createWithMedia(createMeditationTechniqueDto);
  //   } else {
    
  //     return this.meditationTechniqueService.create(createMeditationTechniqueDto);
  //   }
  // }

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

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getMeditationsByUserId(@Param('userId') userId: number): Promise<MeditationTechnique[]> {
    return this.meditationTechniqueService.getByUserId(userId);
  }
}


