import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
     
    });
  }

  async createCheckoutSession(items: { priceId: string; quantity: number }[], successUrl: string, cancelUrl: string) {
    if (!items || items.length === 0) {
      throw new BadRequestException('No items to process');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return { url: session.url };
  }
}
