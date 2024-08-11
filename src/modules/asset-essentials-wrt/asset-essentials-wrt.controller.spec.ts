import { Test, TestingModule } from '@nestjs/testing';
import { AssetEssentialsWrtController } from './asset-essentials-wrt.controller';

describe('AssetEssentialsWrtController', () => {
  let controller: AssetEssentialsWrtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetEssentialsWrtController],
    }).compile();

    controller = module.get<AssetEssentialsWrtController>(AssetEssentialsWrtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
