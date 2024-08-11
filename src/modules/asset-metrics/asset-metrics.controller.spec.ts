import { Test, TestingModule } from '@nestjs/testing';
import { AssetMetricsController } from './asset-metrics.controller';

describe('AssetMetricsController', () => {
  let controller: AssetMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetMetricsController],
    }).compile();

    controller = module.get<AssetMetricsController>(AssetMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
