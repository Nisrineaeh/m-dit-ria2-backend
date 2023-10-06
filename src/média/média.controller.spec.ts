import { Test, TestingModule } from '@nestjs/testing';
import { MédiaController } from './média.controller';
import { MédiaService } from './média.service';

describe('MédiaController', () => {
  let controller: MédiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MédiaController],
      providers: [MédiaService],
    }).compile();

    controller = module.get<MédiaController>(MédiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
