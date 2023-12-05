import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':userId/favorites/:meditationTechniqueId')
  @UseGuards(AuthGuard('jwt'))
  addToFavorites(@Param('userId') userId: string, @Param('meditationTechniqueId') meditationTechniqueId: string) {
    return this.userService.addToFavorites(+userId, +meditationTechniqueId);
  }

  @Delete(':userId/favorites/:meditationTechniqueId')
  @UseGuards(AuthGuard('jwt'))
  removeFromFavorites(@Param('userId') userId: string, @Param('meditationTechniqueId') meditationTechniqueId: string) {
    return this.userService.removeFromFavorites(+userId, +meditationTechniqueId);
  }
}
