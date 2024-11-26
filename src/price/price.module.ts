import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price.service';
import { PriceScheduler } from './price.scheduler/price.scheduler';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { PriceController } from './price.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PriceService, PriceScheduler, PrismaService, EmailService],
  controllers: [PriceController],
})
export class PriceModule {}
