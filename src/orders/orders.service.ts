import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './Entities/order.entity';
import { Customer } from '../auth/entities/customer.entity';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { }

    async createOrder(customerId: number, productIds: number[]) {
        const customer = await this.customerRepository.findOne({
            where: { id: customerId }
        });
        if (!customer) {
            throw new Error('Customer not found');
        }
        const order = this.orderRepository.create({
            customerId: customer.id,
            products: productIds.map(id => ({ id })),
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