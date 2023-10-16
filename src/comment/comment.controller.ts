import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  async create(@Body() dto: CreateCommentDto) {
    return await this.commentService.create(dto);
  }

  @Get('technique/:id')
  async findAllByMeditationTechnique(@Param('id') id: number): Promise<Comment[]> {
    return this.commentService.findAllByMeditationTechnique(id);
  }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}
