import { Test, TestingModule } from '@nestjs/testing';
import { AssetEssentialsWrtService } from './asset-essentials-wrt.service';

describe('AssetEssentialsWrtService', () => {
  let service: AssetEssentialsWrtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetEssentialsWrtService],
    }).compile();

    service = module.get<AssetEssentialsWrtService>(AssetEssentialsWrtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
