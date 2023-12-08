import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, UploadedFile, UseInterceptors, UseGuards, Req, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { MédiaService } from './média.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('media')
export class MédiaController {
  constructor(private readonly médiaService: MédiaService) { }

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
    console.log('ce que je veut', res)
    return this.médiaService.getMédiaById(+id, res);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMédia(@Param('id') id: number, @Res() res) {
    try {
      await this.médiaService.deleteMédia(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (e) {
      if (e instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: e.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

}
