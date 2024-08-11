import { Test, TestingModule } from '@nestjs/testing';
import { AssetMetricsService } from './asset-metrics.service';

describe('AssetMetricsService', () => {
  let service: AssetMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetMetricsService],
    }).compile();

    service = module.get<AssetMetricsService>(AssetMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
