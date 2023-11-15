import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createForumDto: CreateForumDto): Promise<Forum> {

    return this.forumService.create(createForumDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.forumService.findAll();
  }

  @Get('technique/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAllByMeditationTechnique(@Param('id') id: number): Promise<Forum[]> {
    return this.forumService.findAllByMeditationTechnique(id);
  }


  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() updateForumDto: UpdateForumDto): Promise<Forum> {
    return this.forumService.update(id, updateForumDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.forumService.remove(+id);
  }

}
