import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './Entities/order.entity';
import { Customer } from '../auth/entities/customer.entity';
import { Product } from '../Products/Entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Customer, Product])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}