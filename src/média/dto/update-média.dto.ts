import { PartialType } from '@nestjs/mapped-types';
import { CreateMédiaDto } from './create-média.dto';

export class UpdateMédiaDto extends PartialType(CreateMédiaDto) {}
