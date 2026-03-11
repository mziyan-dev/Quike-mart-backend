import { IsString, IsOptional } from 'class-validator';

export class UpdatePaymentDto {

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

}