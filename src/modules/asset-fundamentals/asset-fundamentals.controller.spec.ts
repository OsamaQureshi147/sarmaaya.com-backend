import { Test, TestingModule } from '@nestjs/testing';
import { AssetFundamentalsController } from './asset-fundamentals.controller';

describe('AssetFundamentalsController', () => {
  let controller: AssetFundamentalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetFundamentalsController],
    }).compile();

    controller = module.get<AssetFundamentalsController>(AssetFundamentalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
