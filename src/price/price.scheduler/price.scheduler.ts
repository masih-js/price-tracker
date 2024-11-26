import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoralisHelper } from 'src/shared/utils/moralis-helper.util';
import { PriceService } from '../price.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PriceScheduler {
  constructor(
    private readonly priceService: PriceService,
    private readonly emailService: EmailService,
  ) {}

  // @Cron('* * * * *') // Every 5 minutes
  // async handleFetchPrices() {
  //   console.log('Fetching prices...');
  //   try {
  //     const ethPrice = await MoralisHelper.getPrice(
  //       '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  //     );
  //     const polygonPrice = await MoralisHelper.getPrice(
  //       '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
  //     );

  //     await this.priceService.savePrice('ethereum', Number(ethPrice));
  //     await this.priceService.savePrice('polygon', Number(polygonPrice));

  //     console.log('Prices saved successfully');
  //   } catch (error) {
  //     console.error('Error in fetching and saving prices:', error.message);
  //   }
  // }

  @Cron('* * * * *') // Every 5 minutes
  async handlePriceTracking() {
    console.log('Checking price changes...');
    try {
      const chains = [
        {
          name: 'ethereum',
          address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        },
        {
          name: 'polygon',
          address: '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
        },
      ];

      for (const chain of chains) {
        const currentPrice = await MoralisHelper.getPrice(chain.address);
        const oldPrice = await this.priceService.getPriceOneHourAgo(chain.name);

        if (oldPrice) {
          const percentageIncrease =
            ((Number(currentPrice) - Number(oldPrice)) / Number(oldPrice)) *
            100;
          console.log(percentageIncrease);

          if (percentageIncrease > 3) {
            console.log(
              `Price for ${chain.name} increased by ${percentageIncrease.toFixed(
                2,
              )}% - sending email`,
            );

            await this.emailService.sendEmail(
              'masih.amirij@gmail.com',
              `Price Alert for ${chain.name}`,
              `The price of ${chain.name} has increased by ${percentageIncrease.toFixed(
                2,
              )}%. Current price: $${Number(currentPrice).toFixed(
                2,
              )}, Previous price: $${Number(oldPrice).toFixed(2)}.`,
            );
          }
        }

        await this.priceService.savePrice(chain.name, Number(currentPrice));
      }
    } catch (error) {
      console.error('Error in price tracking:', error.message);
    }
  }
}
