import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  
  @IsNumber()
  customerId: number;

  @IsString() 
  shippingAddress: string;

  @IsArray()
  items: {
    productIds: number[];
    quantity: number;
  }[];
}