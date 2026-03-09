import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller('shipping')
export class ShippingController {
    constructor(private readonly shippingService: ShippingService) { }

    @Post('create')
    async createShipment(@Body() dto: CreateShipmentDto) {
        return await this.shippingService.createShipment(dto.orderId, dto.trackingNumber, dto.carrier, dto.estimatedDelivery);
    }

    @Get(':id')
    async getShipment(@Param('id') id: number) {
        return await this.shippingService.getShipmentById(id);
    }

    @Post(':id/status')
    async updateShipmentStatus(@Param('id') id: number, @Body('status') status: string) {
        return await this.shippingService.updateShipmentStatus(id, status);
    }

    @Delete(':id')
    async deleteShipment(@Param('id') id: number) {
        return await this.shippingService.deleteShipment(id);
    }

}
