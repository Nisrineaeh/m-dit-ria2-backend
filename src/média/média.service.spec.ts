import { Test, TestingModule } from '@nestjs/testing';
import { MédiaService } from './média.service';

describe('MédiaService', () => {
  let service: MédiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MédiaService],
    }).compile();

    service = module.get<MédiaService>(MédiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
