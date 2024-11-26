import { Controller, Get, Param } from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @ApiTags('Price')
  @Get('hourly/:chain')
  @ApiParam({
    name: 'chain',
    description: 'The cryptocurrency chain (e.g., ethereum)',
  })
  @ApiResponse({
    status: 200,
    description: 'Hourly prices for the last 24 hours.',
    schema: {
      example: {
        chain: 'ethereum',
        hourlyPrices: [
          { timestamp: '2024-11-26T12:00:00.000Z', price: 3200.25 },
          { timestamp: '2024-11-26T13:00:00.000Z', price: 3250.75 },
        ],
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid chain' })
  async getHourlyPrices(@Param('chain') chain: string) {
    // Validate the chain
    await this.priceService.validateChain(chain);

    // Fetch hourly prices
    const hourlyPrices = await this.priceService.getHourlyPrices(chain);

    return {
      chain,
      hourlyPrices,
    };
  }
}
