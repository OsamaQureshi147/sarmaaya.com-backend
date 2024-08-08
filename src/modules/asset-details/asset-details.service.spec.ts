import { Test, TestingModule } from '@nestjs/testing';
import { AssetDetailsService } from './asset-details.service';

describe('AssetDetailsService', () => {
  let service: AssetDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetDetailsService],
    }).compile();

    service = module.get<AssetDetailsService>(AssetDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
