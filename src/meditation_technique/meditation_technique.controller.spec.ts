import { Test, TestingModule } from '@nestjs/testing';
import { MeditationTechniqueController } from './meditation_technique.controller';
import { MeditationTechniqueService } from './meditation_technique.service';

describe('MeditationTechniqueController', () => {
  let controller: MeditationTechniqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeditationTechniqueController],
      providers: [MeditationTechniqueService],
    }).compile();

    controller = module.get<MeditationTechniqueController>(MeditationTechniqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
