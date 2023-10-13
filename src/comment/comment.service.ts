import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { MeditationTechnique } from 'src/meditation_technique/entities/meditation_technique.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    comment.comment = dto.comment;
    comment.user = { id: dto.userId } as User; 
    comment.meditationTechnique = { id: dto.meditationTechniqueId } as MeditationTechnique;
    comment.date = new Date();

    return await this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findAllByMeditationTechnique(meditationTechniqueId: number): Promise<Comment[]> {
    return this.commentRepository.createQueryBuilder("comment")
      .where("comment.meditation_technique_id = :meditationTechniqueId", { meditationTechniqueId })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
