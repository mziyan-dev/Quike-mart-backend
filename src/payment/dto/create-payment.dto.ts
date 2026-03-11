import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {

  @IsNumber()
  orderId: number;

  @IsNumber()
  amount: number;

  @IsString()
  paymentMethod: string;

   @IsOptional()
  @IsString()
  transactionId?: string;


}