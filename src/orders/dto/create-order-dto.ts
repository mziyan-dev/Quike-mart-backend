export class CreateOrderDto {

  customerId: number;

  shippingAddress: string;

  items: {
    productId: number;
    quantity: number;
  }[];
}