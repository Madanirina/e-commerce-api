import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout-session')
  async createCheckoutSession(
    @Body() body: { items: { priceId: string; quantity: number }[]; successUrl: string; cancelUrl: string }
  ) {
    return this.paymentService.createCheckoutSession(body.items, body.successUrl, body.cancelUrl);
  }
}
