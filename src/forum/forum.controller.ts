import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  async create(@Body() createForumDto: CreateForumDto): Promise<Forum> {
    return this.forumService.create(createForumDto);
  }

  @Get()
  findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.forumService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateForumDto: UpdateForumDto): Promise<Forum> {
    return this.forumService.update(id, updateForumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumService.remove(+id);
  }
}
