import { Controller, Get, Query } from '@nestjs/common';
import { RealTimeService } from './real-time.service';

@Controller('realtime')
export class RealTimeController {
  constructor(private readonly realTimeService: RealTimeService) {}

  @Get('data')
  async getRealTimeData(
    @Query('identifier') identifier: string,
    @Query('identifierType') identifierType: string,
  ): Promise<any> {
    return this.realTimeService.getRealTimeData(identifier, identifierType);
  }
}
