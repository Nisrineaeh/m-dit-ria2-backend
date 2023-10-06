import { Test, TestingModule } from '@nestjs/testing';
import { MeditationTechniqueService } from './meditation_technique.service';

describe('MeditationTechniqueService', () => {
  let service: MeditationTechniqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeditationTechniqueService],
    }).compile();

    service = module.get<MeditationTechniqueService>(MeditationTechniqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
