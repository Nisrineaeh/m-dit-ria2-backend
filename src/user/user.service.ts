import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { MeditationTechnique } from 'src/meditation_technique/entities/meditation_technique.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MeditationTechnique)
    private meditationRepository: Repository<MeditationTechnique>,
  ) { }

  async findAll() {
    return await this.userRepository.find({relations: ['favorites']});
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne(
    {where:{id: id}, relations: ['favorites']}, 
    )
    if(!userFound){
      throw new NotFoundException(`l'id numéro ${id} n'existe pas !`)
    }
    return userFound;
  } 

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const userFound = await this.userRepository.findOne(
      { where: { id: id } }
    )
    if (!userFound) {
      throw new NotFoundException(`l'id numéro ${id} n'existe pas !`)
    }
    Object.assign(userFound, updateUserDto);
    this.userRepository.save(userFound)
    return userFound;
  }

  async remove(id: number) {
    const userFound = await this.userRepository.findOne({where:{id:id}})
    
    if (!userFound) {
      throw new NotFoundException(`l'id numéro ${id} n'existe pas !`)
    }
    return await this.userRepository.remove(userFound);
  }

  async addToFavorites(userId: number, meditationTechniqueId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    const meditationTechnique = await this.meditationRepository.findOne({where:{id: meditationTechniqueId}});

    if (!user || !meditationTechnique) {
      throw new NotFoundException('Utilisateur ou technique de méditation non trouvé !');
    }

    user.favorites.push(meditationTechnique);
    return this.userRepository.save(user);
  }

  async removeFromFavorites(userId: number, meditationTechniqueId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.favorites = user.favorites.filter(mt => mt.id !== meditationTechniqueId);
    return this.userRepository.save(user);
  }



  

}
