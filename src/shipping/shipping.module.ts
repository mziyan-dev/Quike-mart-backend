import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipment } from './Entities/shipping.entity';
import { Order } from '../orders/Entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shipment, Order])
  ],
  providers: [ShippingService],
  controllers: [ShippingController],
})
export class ShippingModule {}