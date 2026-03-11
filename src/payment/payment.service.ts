import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './Entites/payment.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/Entities/order.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(Order) private orderRepository: Repository<Order>
    ) { }


    async createPayment(createPaymentDto: CreatePaymentDto) {
        const order = await this.orderRepository.findOne({
            where: { id: createPaymentDto.orderId }
        });
        if (!order) {
            throw new Error('Order not found');
        }

        const payment = this.paymentRepository.create({
            orderId: createPaymentDto.orderId,
            amount: createPaymentDto.amount,
            paymentMethod: createPaymentDto.paymentMethod,
            transactionId: createPaymentDto.transactionId,
            status: 'pending'
        });
        return await this.paymentRepository.save(payment);
    }


    async updatePaymentStatus(id: number, updatePaymentDto: UpdatePaymentDto) {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new Error('Payment not found');
        }
        payment.status = updatePaymentDto.status;
        const updatedPayment = await this.paymentRepository.save(payment);
        if (updatePaymentDto.status === 'paid') {

            const order = await this.orderRepository.findOne({
                where: { id: payment.orderId }
            });
            if (order) {
                order.status = 'confirmed';
                await this.orderRepository.save(order);
            }
        }
        return updatedPayment;
    }



}
