import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Order } from 'src/orders/Entities/order.entity';
import { Payment } from './Entites/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Payment, Order])
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule { }
