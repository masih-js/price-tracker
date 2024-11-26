import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  chain: string;

  @IsNumber()
  targetPrice: number;

  @IsEmail()
  email: string;
}
