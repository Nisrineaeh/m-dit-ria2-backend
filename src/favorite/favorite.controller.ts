import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Favorite[]> {
    return this.favoriteService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  async findByUser(@Param('userId') userId: number): Promise<Favorite[]> {
    return this.favoriteService.findByUser(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number): Promise<void> {
    return this.favoriteService.remove(id);
  }
}
