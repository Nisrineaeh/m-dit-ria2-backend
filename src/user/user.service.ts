import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  // async create(createUserDto: CreateUserDto) {
  //   const newUser = this.userRepository.create(createUserDto);
  //   const result = await this.userRepository.save(newUser);
  //   return result;
  // }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne(
    {where:{id: id}}
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

  

}
