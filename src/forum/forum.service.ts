import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
  ) { }

  async create(createForumDto: CreateForumDto): Promise<Forum> {
    const post = new Forum();
    post.date = createForumDto.date;
    post.message = createForumDto.message;
    post.meditation_technique = { id: createForumDto.meditation_technique_id } as any;

    return await this.forumRepository.save(post);
  }


  async findAll(): Promise<Forum[]> {
    return await this.forumRepository.find();
  }

  async findOne(id: number): Promise<Forum> {
    const post = await this.forumRepository.findOne({where:{id:id}});
    if (!post) {
      throw new NotFoundException(`Le Forum avec le id : ${id} n'existe pas !`);
    }
    return post;
  }

  async update(id: number, updateForumDto: UpdateForumDto): Promise<Forum> {
    const post = await this.findOne(id);

    if (updateForumDto.date) {
      post.date = updateForumDto.date;
    }

    if (updateForumDto.message) {
      post.message = updateForumDto.message;
    }

    if (updateForumDto.meditation_technique_id) {
      post.meditation_technique = { id: updateForumDto.meditation_technique_id } as any;
    }

    return await this.forumRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.forumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Le Forum avec le id : ${id} n'existe pas !`);
    }
  }
}
