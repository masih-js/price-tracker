import { Body, Controller, Post } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiTags('Alert')
  @Post('create')
  @ApiBody({
    schema: {
      example: {
        chain: 'ethereum',
        targetPrice: 1000,
        email: 'user@example.com',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Alert created successfully.',
    schema: {
      example: {
        message: 'Alert created successfully',
        alert: {
          id: 1,
          chain: 'ethereum',
          targetPrice: 1000,
          email: 'user@example.com',
          status: 'active',
          createdAt: '2024-11-26T12:00:00.000Z',
          triggeredAt: null,
        },
      },
    },
  })
  async setAlert(@Body() createAlertDto: CreateAlertDto) {
    const alert = await this.alertService.createAlert(
      createAlertDto.chain,
      createAlertDto.targetPrice,
      createAlertDto.email,
    );

    return {
      message: 'Alert created successfully',
      alert,
    };
  }
}
