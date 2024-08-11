import { Test, TestingModule } from '@nestjs/testing';
import { AssetEssentialsRtController } from './asset-essentials-rt.controller';

describe('AssetEssentialsRtController', () => {
  let controller: AssetEssentialsRtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetEssentialsRtController],
    }).compile();

    controller = module.get<AssetEssentialsRtController>(AssetEssentialsRtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
