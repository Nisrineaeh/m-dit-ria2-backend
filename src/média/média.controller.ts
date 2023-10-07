import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MédiaService } from './média.service';
import { CreateMédiaDto } from './dto/create-média.dto';
import { UpdateMédiaDto } from './dto/update-média.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('média')
export class MédiaController {
  constructor(private readonly médiaService: MédiaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.médiaService.create(file);
  }
 
  @Get()
  async getmédia(@Res({ passthrough: true }) res): Promise<StreamableFile> {
    return this.médiaService.getMédia(res);
  }

  @Get(':id')
  getImageById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.médiaService.getMédiaById(+id, res);
  }

}
