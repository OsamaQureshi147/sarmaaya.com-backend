import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RealTimeService {
  constructor(private readonly configService: ConfigService) {}

  async getRealTimeData(identifier: string, identifierType: string): Promise<any> {
    const apiUrl = `https://api.factset.com/wealth/v3/notation/key-figures/year/10/get`; 
    try {
      const response = await axios.get(apiUrl, {
        params: {
          identifier: identifier,
          identifierType: identifierType,
          //_attributes: ['high', 'low', 'tradingVolume', 'volatility'], // Customize this based on the attributes you want
        },
        auth: {
          username: this.configService.get('FACTSET_USERNAME'),
          password: this.configService.get('FACTSET_PASSWORD'),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Extract the data from the response
      const { idNotation, sourceIdentifier, referenceDate, performance, high, low, tradingVolume, volatility } = response.data.data;

      // Construct the expected response format
      const formattedResponse = {
        data: {
          idNotation,
          sourceIdentifier,
          referenceDate,
          performance,
          high,
          low,
          tradingVolume,
          volatility,
        },
        meta: {
          status: {
            code: response.status, // HTTP status code
          },
        },
      };

      return formattedResponse;

    } catch (error) {
      console.log(error)
      console.error(`Error fetching real-time data:`, error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to fetch real-time data');
    }
  }
}
