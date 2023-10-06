import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MédiaService } from './média.service';
import { CreateMédiaDto } from './dto/create-média.dto';
import { UpdateMédiaDto } from './dto/update-média.dto';

@Controller('média')
export class MédiaController {
  constructor(private readonly médiaService: MédiaService) {}

  @Post()
  create(@Body() createMédiaDto: CreateMédiaDto) {
    return this.médiaService.create(createMédiaDto);
  }

  @Get()
  findAll() {
    return this.médiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.médiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMédiaDto: UpdateMédiaDto) {
    return this.médiaService.update(+id, updateMédiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.médiaService.remove(+id);
  }
}
