import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AlertScheduler {
  private readonly logger = new Logger(AlertScheduler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  @Cron('*/5 * * * *') // Runs every 5 minutes
  async handleAlerts() {
    this.logger.log('Checking alerts...');
    try {
      // Fetch all active alerts
      const activeAlerts = await this.prisma.alert.findMany({
        where: { status: 'active' },
      });

      for (const alert of activeAlerts) {
        // Fetch the latest price for the chain
        const latestPriceRecord = await this.prisma.price.findFirst({
          where: { chain: alert.chain },
          orderBy: { timestamp: 'desc' },
        });

        if (!latestPriceRecord) {
          this.logger.warn(`No price data found for ${alert.chain}`);
          continue;
        }

        const currentPrice = latestPriceRecord.price;

        // Check if the target price is met or exceeded
        if (currentPrice >= alert.targetPrice) {
          this.logger.log(
            `Triggering alert for ${alert.chain} at price $${currentPrice}`,
          );

          // Send the email
          await this.emailService.sendEmail(
            alert.email,
            `Price Alert Triggered for ${alert.chain}`,
            `The price of ${alert.chain} has reached $${currentPrice}, meeting or exceeding your target of $${alert.targetPrice}.`,
          );

          // Mark the alert as triggered
          await this.prisma.alert.update({
            where: { id: alert.id },
            data: {
              status: 'triggered',
              triggeredAt: new Date(),
            },
          });
        }
      }
    } catch (error) {
      this.logger.error('Error handling alerts', error.message);
    }
  }
}
