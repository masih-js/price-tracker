import { Injectable, BadRequestException } from '@nestjs/common';
import { MoralisHelper } from 'src/shared/utils/moralis-helper.util';

@Injectable()
export class SwapService {
  async getSwapRate(ethAmount: number): Promise<{
    btcAmount: number;
    feeEth: number;
    feeUsd: number;
  }> {
    if (ethAmount <= 0) {
      throw new BadRequestException('Ethereum amount must be greater than 0.');
    }

    // Fetch current prices
    const ethPriceUsd = await MoralisHelper.getPrice(
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ); // ETH price
    const btcPriceUsd = await MoralisHelper.getPrice(
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    ); // BTC price

    if (!ethPriceUsd || !btcPriceUsd) {
      throw new BadRequestException('Failed to fetch cryptocurrency prices.');
    }

    // Calculate BTC amount
    const btcAmount = (ethAmount * ethPriceUsd) / btcPriceUsd;

    // Calculate fees
    const feeEth = ethAmount * 0.03; // 0.03% of Ethereum amount
    const feeUsd = feeEth * ethPriceUsd; // Fee in USD

    return {
      btcAmount,
      feeEth,
      feeUsd,
    };
  }
}
