import { Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Headers, Req } from '@nestjs/common';
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Req() req: any) {
    const { orderId, amount, paymentMethod, transactionId } = req.body;
    return this.paymentService.createPayment({ orderId, amount, paymentMethod, transactionId });
  }

    @Post('update-status/:id')
    async updatePaymentStatus(@Param('id') id: number, @Req() req: any) {
        const { status, transactionId } = req.body;
        return this.paymentService.updatePaymentStatus(id, { status, transactionId });
    }
}
