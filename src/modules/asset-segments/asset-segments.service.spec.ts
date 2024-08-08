import { Test, TestingModule } from '@nestjs/testing';
import { AssetSegmentsService } from './asset-segments.service';

describe('AssetSegmentsService', () => {
  let service: AssetSegmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetSegmentsService],
    }).compile();

    service = module.get<AssetSegmentsService>(AssetSegmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
