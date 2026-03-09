import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
    ) { }

    @Post('create')
    async createOrder(@Body() dto: CreateOrderDto) {
        return await this.ordersService.createOrder(dto);
    }

    @Get('customer-orders')
    async getOrdersByCustomer(@Body() dto: { customerId: number }) {
        return await this.ordersService.getOrdersByCustomer(dto.customerId);
    }

    @Get('all')
    async getAllOrders() {
        return await this.ordersService.getAllOrders();
    }

    @Post('update-status')
    async updateOrderStatus(@Body() dto: { orderId: number, status: string }) {
        return await this.ordersService.updateOrderStatus(dto.orderId, dto.status);
    }
}
