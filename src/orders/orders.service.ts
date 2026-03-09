import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './Entities/order.entity';
import { Customer } from '../auth/entities/customer.entity';
import { CreateOrderDto } from './dto/create-order-dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { }

    async createOrder(dto: CreateOrderDto) {
        const customer = await this.customerRepository.findOne({
            where: { id: dto.customerId }
        });

        const order = this.orderRepository.create({
            customerId: dto.customerId,
            shippingAddress: dto.shippingAddress,
            totalAmount: 0,
        });

        return await this.orderRepository.save(order);
    }

    async getOrdersByCustomer(customerId: number) {
        return await this.orderRepository.find({
            where: { customerId },
            relations: ['products'],
        });
    }


    async getAllOrders() {
        return await this.orderRepository.find({ relations: ['products', 'customer'] });
    }

    async updateOrderStatus(orderId: number, status: string) {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        if (!order) {
            throw new Error('Order not found');
        }
        order.status = status;
        return await this.orderRepository.save(order);
    }


}