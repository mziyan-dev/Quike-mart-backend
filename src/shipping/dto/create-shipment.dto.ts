import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateShipmentDto {

  @IsNumber()
  orderId: number;

  @IsString()
  trackingNumber: string;

  @IsString()
  carrier: string;

  @IsDateString()
  estimatedDelivery: Date;
}