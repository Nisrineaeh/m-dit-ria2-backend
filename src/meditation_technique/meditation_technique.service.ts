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
    // @InjectRepository(Média)
    // private médiaRepository: Repository<Média>,
  ) { }

  // async create(createTechniqueMeditationDto: CreateMeditationTechniqueDto): Promise<MeditationTechnique> {
  //   console.log('SERVICE',createTechniqueMeditationDto);
  //   try {
  //   const newTechnique = this.techniqueMeditationRepository.create(createTechniqueMeditationDto);

  //     return this.techniqueMeditationRepository.save(newTechnique);
  //   } catch (error) {
  //     throw new InternalServerErrorException('Erreur survenue lors de la création de la technique de méditation.');
  //   }
  // }
  async create(createTechniqueMeditationDto: CreateMeditationTechniqueDto) {
    console.log('SERVICE DTO', createTechniqueMeditationDto);
    console.log('SERVICE DTO', createTechniqueMeditationDto.user_id);
    console.log('SERVICE DTO', createTechniqueMeditationDto.audio_media_id);
    console.log('SERVICE DTO', createTechniqueMeditationDto.visual_media_id);
    // const newTech = this.techniqueMeditationRepository.create(createTechniqueMeditationDto);
    // console.log('NEW TECH', newTech)
    const result = await this.techniqueMeditationRepository.save(createTechniqueMeditationDto);
    console.log('RESULT', result)
    console.log('RESULT', result.user_id)
    console.log('RESULT', result.audio_media_id)
    console.log('RESULT', result.visual_media_id)
    return result;
  }
  // async createWithMedia(createMeditationTechniqueDto: CreateMeditationTechniqueDto): Promise<MeditationTechnique> {
  //   try {
  //     const { audio_media_id, visual_media_id, ...techniqueData } = createMeditationTechniqueDto;

  //     const audioMedia = await this.médiaRepository.findOne({ where: { id: audio_media_id } });
  //     const visualMedia = await this.médiaRepository.findOne({ where: { id: visual_media_id } });

  //     if (!audioMedia || !visualMedia) {
  //       throw new NotFoundException('Les médias audio et visuels doivent exister.');
  //     }

  //     const newTechnique = this.techniqueMeditationRepository.create({
  //       name: createMeditationTechniqueDto.name,
  //       description: createMeditationTechniqueDto.description,
  //       atmosphere: createMeditationTechniqueDto.atmosphere,
  //       duration: createMeditationTechniqueDto.duration,
  //       keyword: createMeditationTechniqueDto.keyword,
  //       audioMedia: audioMedia,
  //       visualMedia: visualMedia,
  //     });

  //     return this.techniqueMeditationRepository.save(newTechnique);
  //   } catch (error) {
  //     throw new InternalServerErrorException('Erreur survenue lors de la création de la technique de méditation avec médias.');
  //   }
  // }


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
}
