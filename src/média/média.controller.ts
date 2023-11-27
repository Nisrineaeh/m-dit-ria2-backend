import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, UploadedFile, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { MédiaService } from './média.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('media')
export class MédiaController {
  constructor(private readonly médiaService: MédiaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    console.log(file);
    return this.médiaService.create(file, req.user);
  }
 
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getMédia(@Res({ passthrough: true }) res): Promise<StreamableFile> {
    return this.médiaService.getMédia(res);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getMédiaById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.médiaService.getMédiaById(+id, res);
  }

}
