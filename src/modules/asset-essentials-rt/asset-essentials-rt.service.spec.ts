import { Test, TestingModule } from '@nestjs/testing';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';

describe('AssetEssentialsRtService', () => {
  let service: AssetEssentialsRtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetEssentialsRtService],
    }).compile();

    service = module.get<AssetEssentialsRtService>(AssetEssentialsRtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
