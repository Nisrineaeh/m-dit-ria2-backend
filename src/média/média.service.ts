import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { CreateMédiaDto } from './dto/create-média.dto';
import { UpdateMédiaDto } from './dto/update-média.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Média } from './entities/média.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MédiaService {

  constructor(@InjectRepository(Média) private médiaRepository: Repository<Média>, @InjectRepository(User) private userRepository: Repository<User>){}

  create(média: Express.Multer.File, user: User) {
    console.log('le média : ' + média.originalname);
    return this.médiaRepository.save({
      name: média.filename,
      mimetype: média.mimetype,
      size: média.size,
      description: média.originalname,
      user: user
    });
  }

 

  async getMédia(res): Promise<StreamableFile> {
    const result = await this.médiaRepository.find();
    console.log(result);
    let médiaFile;
    const médiaTab = [];
    for (let i = 0; i < result.length; i++) {
      médiaFile = createReadStream(
        join(process.cwd(), 'uploads', result[i].name),
      );
      res.set('Content-Type', result[i].mimetype);
      médiaTab.push(médiaFile);
    }
    return new StreamableFile(médiaFile);
  }

  async getMédiaById(id: number, res): Promise<StreamableFile> {
    const result = await this.médiaRepository.findOneBy({id: id });
    if (!result) {
      throw new NotFoundException(`The média ${id} is not found !`);
    }
    const médiaFile = createReadStream(
      join(process.cwd(), 'uploads', result.name),
    );
    res.set('Content-Type', result.mimetype);
    console.log('mon média', médiaFile);
    return new StreamableFile(médiaFile);
  }

  async deleteMédia(id: number): Promise<void> {
    const média = await this.médiaRepository.findOneBy({ id });
    if (!média) {
      throw new NotFoundException(`Média with ID ${id} not found`);
    }

    // Supprimer l'entrée de la base de données
    await this.médiaRepository.remove(média);
  }
}
