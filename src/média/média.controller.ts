import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { MédiaService } from './média.service';
import { CreateMédiaDto } from './dto/create-média.dto';
import { UpdateMédiaDto } from './dto/update-média.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('media')
export class MédiaController {
  constructor(private readonly médiaService: MédiaService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.médiaService.create(file);
  }
 
  @Get()
  @UseGuards(AuthGuard())
  async getMédia(@Res({ passthrough: true }) res): Promise<StreamableFile> {
    return this.médiaService.getMédia(res);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getMédiaById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.médiaService.getMédiaById(+id, res);
  }

}
