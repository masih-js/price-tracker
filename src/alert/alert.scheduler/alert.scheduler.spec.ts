import { Prisma } from '@prisma/client';
import { AlertScheduler } from './alert.scheduler';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

describe('AlertScheduler', () => {
  it('should be defined', () => {
    expect(
      new AlertScheduler(new PrismaService(), new EmailService()),
    ).toBeDefined();
  });
});
