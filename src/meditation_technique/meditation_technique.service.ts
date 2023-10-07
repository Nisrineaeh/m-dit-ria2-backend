import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMeditationTechniqueDto } from './dto/create-meditation_technique.dto';
import { UpdateMeditationTechniqueDto } from './dto/update-meditation_technique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeditationTechnique } from './entities/meditation_technique.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeditationTechniqueService {
  constructor(
    @InjectRepository(MeditationTechnique)
    private techniqueMeditationRepository: Repository<MeditationTechnique>,
  ) { }

  async create(createTechniqueMeditationDto: CreateMeditationTechniqueDto): Promise<MeditationTechnique> {
    try {
      const newTechnique = this.techniqueMeditationRepository.create(createTechniqueMeditationDto);
      return this.techniqueMeditationRepository.save(newTechnique);
    } catch (error) {
      throw new InternalServerErrorException('Erreur survenue lors de la création de la technique de méditation.');
    }
  }

  async findAll(): Promise<MeditationTechnique[]> {
    return await this.techniqueMeditationRepository.find();
  }

  async findOne(id: number): Promise<MeditationTechnique> {
    const technique = await this.techniqueMeditationRepository.findOne({ where: { id: id } });
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
}
