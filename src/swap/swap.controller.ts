import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SwapService } from './swap.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('rate')
  @ApiQuery({
    name: 'ethAmount',
    description: 'The amount of Ethereum to swap',
  })
  @ApiResponse({
    status: 200,
    description: 'Swap rate calculated successfully.',
    schema: {
      example: {
        ethereumAmount: 2,
        bitcoinAmount: 0.057843,
        fee: {
          eth: 0.0006,
          usd: 1.2,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid Ethereum amount' })
  async getSwapRate(@Query('ethAmount') ethAmount: string) {
    const amount = parseFloat(ethAmount);
    if (isNaN(amount)) {
      throw new BadRequestException('Invalid Ethereum amount.');
    }

    const swapRate = await this.swapService.getSwapRate(amount);

    return {
      ethereumAmount: amount,
      bitcoinAmount: swapRate.btcAmount,
      fee: {
        eth: swapRate.feeEth,
        usd: swapRate.feeUsd,
      },
    };
  }
}
