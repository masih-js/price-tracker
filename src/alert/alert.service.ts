import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private readonly prisma: PrismaService) {}

  async validateChain(chain: string): Promise<void> {
    const exists = await this.prisma.price.findFirst({
      where: { chain },
    });

    if (!exists) {
      throw new BadRequestException(`The chain "${chain}" does not exist.`);
    }
  }

  async createAlert(chain: string, targetPrice: number, email: string) {
    await this.validateChain(chain);

    const alert = await this.prisma.alert.create({
      data: {
        chain,
        targetPrice,
        email,
        status: 'active',
        createdAt: new Date(),
      },
    });

    return alert;
  }
}
