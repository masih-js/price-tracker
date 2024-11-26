import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlertScheduler } from './alert.scheduler/alert.scheduler';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [AlertService, PrismaService, AlertScheduler, EmailService],
  controllers: [AlertController],
})
export class AlertModule {}
