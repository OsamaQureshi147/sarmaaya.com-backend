import { Test, TestingModule } from '@nestjs/testing';
import { AssetFundamentalsService } from './asset-fundamentals.service';

describe('AssetFundamentalsService', () => {
  let service: AssetFundamentalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetFundamentalsService],
    }).compile();

    service = module.get<AssetFundamentalsService>(AssetFundamentalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
