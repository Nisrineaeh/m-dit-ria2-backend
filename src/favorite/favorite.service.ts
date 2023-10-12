import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { MeditationTechnique } from 'src/meditation_technique/entities/meditation_technique.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const existingFavorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: createFavoriteDto.userId },
        meditation_technique: { id: createFavoriteDto.meditationTechniqueId }
      }
    });

    if (existingFavorite) {
      return existingFavorite;
    }

    const favorite = new Favorite();
    favorite.user = { id: createFavoriteDto.userId } as User;
    favorite.meditation_technique = { id: createFavoriteDto.meditationTechniqueId } as MeditationTechnique;

    return await this.favoriteRepository.save(favorite);
  }

  async findAll(): Promise<Favorite[]> {
    return await this.favoriteRepository.find();
  }

  async findByUser(userId: number): Promise<Favorite[]> {
    return await this.favoriteRepository.find({ where: { user: { id: userId } } , relations: ["meditation_technique"]});
  }


  async remove(id: number): Promise<void> {
    const result = await this.favoriteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`La tech favorite avec le id : ${id} n'existe pas !`);
    }
  }
}
