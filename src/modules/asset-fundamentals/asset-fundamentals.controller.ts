import { Controller, Get } from '@nestjs/common';
import { AssetFundamentalsService } from './asset-fundamentals.service';

@Controller('asset-fundamentals')
export class AssetFundamentalsController {
    constructor(
        private readonly assetFundamentalsService: AssetFundamentalsService,
    ) { }

    @Get()
    getMetrics(): any {
        return this.assetFundamentalsService.test();
    }

    @Get('metrics')
    getAllMetrics(): any {
        return this.assetFundamentalsService.getAllMetrics();
    }
}
