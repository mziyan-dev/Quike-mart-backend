import { Injectable } from '@nestjs/common';
import { Shipment } from './Entities/shipping.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/Entities/order.entity';

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(Shipment)
        private shipmentRepository: Repository<Shipment>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>
    ) { }

    async createShipment(orderId: number, trackingNumber: string, carrier: string, estimatedDelivery: Date)
    : Promise<Shipment> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId }
        });
        if (!order) {
            throw new Error('Order not found');
        }
        const shipment = this.shipmentRepository.create({
            orderId: order.id,
            trackingNumber,
            carrier,
            estimatedDelivery
        });

        return await this.shipmentRepository.save(shipment);
    }

    async getShipmentById(id: number): Promise<Shipment | null> {
        return await this.shipmentRepository.findOne({
            where: { id }
        });
    }


    async updateShipmentStatus(id: number, status: string): Promise<Shipment> {
        const shipment = await this.shipmentRepository.findOne({
            where: { id }
        });
        if (!shipment) {
            throw new Error('Shipment not found');
        }
        shipment.status = status;
        return await this.shipmentRepository.save(shipment);
    }


    async deleteShipment(id: number): Promise<void> {
        await this.shipmentRepository.delete(id);
    }
}
