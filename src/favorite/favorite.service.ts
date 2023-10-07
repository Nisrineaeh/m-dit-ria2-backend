import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) { }

  async create(userId: number, meditationTechniqueId: number): Promise<Favorite> {
    const favorite = new Favorite();
    favorite.user = { id: userId } as any;
    favorite.meditation_technique = { id: meditationTechniqueId } as any;

    return await this.favoriteRepository.save(favorite);
  }

  async findAll(): Promise<Favorite[]> {
    return await this.favoriteRepository.find();
  }

  async findByUser(userId: number): Promise<Favorite[]> {
    return await this.favoriteRepository.find({ where: { id: userId } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.favoriteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`La tech favorite avec le id : ${id} n'existe pas !`);
    }
  }
}
