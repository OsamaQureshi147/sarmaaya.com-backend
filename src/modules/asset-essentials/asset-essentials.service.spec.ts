import { Test, TestingModule } from '@nestjs/testing';
import { AssetEssentialsService } from './asset-essentials.service';

describe('AssetEssentialsService', () => {
  let service: AssetEssentialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetEssentialsService],
    }).compile();

    service = module.get<AssetEssentialsService>(AssetEssentialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
