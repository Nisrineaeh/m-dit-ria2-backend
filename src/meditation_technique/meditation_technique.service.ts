import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMeditationTechniqueDto } from './dto/create-meditation_technique.dto';
import { UpdateMeditationTechniqueDto } from './dto/update-meditation_technique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeditationTechnique } from './entities/meditation_technique.entity';
import { Repository } from 'typeorm';
import { Média } from 'src/média/entities/média.entity';
import { Certificate } from 'crypto';

@Injectable()
export class MeditationTechniqueService {
  constructor(
    @InjectRepository(MeditationTechnique)
    private techniqueMeditationRepository: Repository<MeditationTechnique>,
  ) { }


  async create(createTechniqueMeditationDto: CreateMeditationTechniqueDto) {
    console.log('SERVICE DTO', createTechniqueMeditationDto);

    console.log('SERVICE DTO', createTechniqueMeditationDto.audio_media_id);
    console.log('SERVICE DTO', createTechniqueMeditationDto.visual_media_id);

    const tech = new MeditationTechnique();
    tech.name = createTechniqueMeditationDto.name;
    tech.description = createTechniqueMeditationDto.description;
    tech.atmosphere = createTechniqueMeditationDto.atmosphere;
    tech.duration = createTechniqueMeditationDto.duration;
    tech.keyword = createTechniqueMeditationDto.keyword;
    tech.createdBy = createTechniqueMeditationDto.user_id;
    tech.visualMedia = createTechniqueMeditationDto.visual_media_id;
    tech.audioMedia =  createTechniqueMeditationDto.audio_media_id;
    console.log('TECH !!!!!!!!!',tech)
    const result = await this.techniqueMeditationRepository.save(tech);
    console.log('RESULT', result)
    return result;
  }
 


  async findAll(): Promise<MeditationTechnique[]> {
    return await this.techniqueMeditationRepository.find();
  }

  async findOne(id: number): Promise<MeditationTechnique> {
    const technique = await this.techniqueMeditationRepository.findOneBy({ id: id });
    if (!technique) throw new NotFoundException(`La technique de méditation avec l'ID ${id} n'existe pas.`);
    return technique;
  }

  async update(id: number, updateTechniqueMeditationDto: UpdateMeditationTechniqueDto): Promise<MeditationTechnique> {
    const techniqueToUpdate = await this.findOne(id);
    Object.assign(techniqueToUpdate, updateTechniqueMeditationDto);
    return await this.techniqueMeditationRepository.save(techniqueToUpdate);
  }

  async remove(id: number): Promise<void> {
    try {
      const technique = await this.findOne(id);
      await this.techniqueMeditationRepository.remove(technique);
      console.log('Technique de méditation supprimée avec succès :', technique);
    } catch (error) {
      console.error('Erreur lors de la suppression de la technique de méditation :', error);
      throw new InternalServerErrorException('Une erreur est survenue lors de la suppression de la technique de méditation.');
    }
  }

  async getByUserId(userId: number): Promise<MeditationTechnique[]> {
    return this.techniqueMeditationRepository.createQueryBuilder("meditationTechnique")
      .innerJoinAndSelect("meditationTechnique.createdBy", "user")
      .where("user.id = :userId", { userId })
      .getMany();
  }
}
