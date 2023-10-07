import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createForumDto: CreateForumDto): Promise<Forum> {
    return this.forumService.create(createForumDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: number) {
    return this.forumService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: number, @Body() updateForumDto: UpdateForumDto): Promise<Forum> {
    return this.forumService.update(id, updateForumDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.forumService.remove(+id);
  }
}
