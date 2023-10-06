import { Injectable } from '@nestjs/common';
import { CreateMédiaDto } from './dto/create-média.dto';
import { UpdateMédiaDto } from './dto/update-média.dto';

@Injectable()
export class MédiaService {
  create(createMédiaDto: CreateMédiaDto) {
    return 'This action adds a new média';
  }

  findAll() {
    return `This action returns all média`;
  }

  findOne(id: number) {
    return `This action returns a #${id} média`;
  }

  update(id: number, updateMédiaDto: UpdateMédiaDto) {
    return `This action updates a #${id} média`;
  }

  remove(id: number) {
    return `This action removes a #${id} média`;
  }
}
