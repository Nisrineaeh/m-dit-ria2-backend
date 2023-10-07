import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body('userId') userId: number, @Body('meditationTechniqueId') meditationTechniqueId: number): Promise<Favorite> {
    return this.favoriteService.create(userId, meditationTechniqueId);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(): Promise<Favorite[]> {
    return this.favoriteService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard())
  async findByUser(@Param('userId') userId: number): Promise<Favorite[]> {
    return this.favoriteService.findByUser(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: number): Promise<void> {
    return this.favoriteService.remove(id);
  }
}
