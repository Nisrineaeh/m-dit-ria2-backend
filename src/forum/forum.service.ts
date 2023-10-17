import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { User } from 'src/user/entities/user.entity';
import { MeditationTechnique } from 'src/meditation_technique/entities/meditation_technique.entity';


@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MeditationTechnique) private readonly meditationTechniqueRepository: Repository<MeditationTechnique>,
  ) { }

  async create(createForumDto: CreateForumDto): Promise<Forum> {
    const forum = new Forum();
    forum.message = createForumDto.message;

    const user = await this.userRepository.findOne({ where: { id: createForumDto.user_id } });
    forum.user = user;
    forum.name = createForumDto.name;

    forum.meditation_technique = { id: createForumDto.meditation_technique_id } as MeditationTechnique;
    forum.date = new Date();

    return await this.forumRepository.save(forum);
  }



  async findAll(): Promise<Forum[]> {
    return await this.forumRepository.find();
  }

  async findAllByMeditationTechnique(meditationTechniqueId: number): Promise<Forum[]> {

    return this.forumRepository.createQueryBuilder("forum")
      .where("forum.meditation_technique_id = :meditationTechniqueId", { meditationTechniqueId })
      .getMany();
  }



  async findOne(id: number): Promise<Forum> {
    const post = await this.forumRepository.findOne({
      where: { id: id },
      relations: ["meditation_technique", "user"]
    });
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

