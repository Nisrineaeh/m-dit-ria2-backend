import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MédiaService } from './média.service';
import { CreateMédiaDto } from './dto/create-média.dto';
import { UpdateMédiaDto } from './dto/update-média.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MédiaController {
  constructor(private readonly médiaService: MédiaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.médiaService.create(file);
  }
 
  @Get()
  async getMédia(@Res({ passthrough: true }) res): Promise<StreamableFile> {
    return this.médiaService.getMédia(res);
  }

  @Get(':id')
  getMédiaById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.médiaService.getMédiaById(+id, res);
  }

}
