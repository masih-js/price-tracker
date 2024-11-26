import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PriceModule } from './price/price.module';
import { PrismaService } from './prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { AlertModule } from './alert/alert.module';
import { SwapModule } from './swap/swap.module';

@Module({
  imports: [ConfigModule.forRoot(), PriceModule, EmailModule, AlertModule, SwapModule],
  providers: [PrismaService],
})
export class AppModule {}
