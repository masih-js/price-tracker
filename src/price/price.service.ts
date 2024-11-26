import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PriceService {
  constructor(private readonly prisma: PrismaService) {}

  async savePrice(chain: string, price: number): Promise<void> {
    await this.prisma.price.create({
      data: {
        chain,
        price,
        timestamp: new Date(), // Automatically handled by Prisma if default is set
      },
    });
  }

  async getPriceOneHourAgo(chain: string): Promise<number | null> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const priceRecord = await this.prisma.price.findFirst({
      where: { chain, timestamp: { lt: oneHourAgo } },
      orderBy: { timestamp: 'desc' },
    });

    return priceRecord ? priceRecord.price : null;
  }

  async validateChain(chain: string): Promise<void> {
    const exists = await this.prisma.price.findFirst({
      where: { chain },
    });

    if (!exists) {
      throw new BadRequestException(`The chain "${chain}" does not exist.`);
    }
  }

  async getHourlyPrices(
    chain: string,
  ): Promise<{ timestamp: Date; price: number }[]> {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Fetch all prices from the last 24 hours
    const prices = await this.prisma.price.findMany({
      where: {
        chain,
        timestamp: {
          gte: oneDayAgo,
          lte: now,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    // Create hourly intervals and filter null prices
    const hourlyPrices: { timestamp: Date; price: number }[] = [];
    for (let i = 0; i < 24; i++) {
      const hourStart = new Date(oneDayAgo.getTime() + i * 60 * 60 * 1000);
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);

      // Find the closest price for the hour
      const priceInHour = prices.find(
        (price) => price.timestamp >= hourStart && price.timestamp < hourEnd,
      );

      if (priceInHour) {
        hourlyPrices.push({
          timestamp: hourStart,
          price: priceInHour.price,
        });
      }
    }

    return hourlyPrices;
  }
}
