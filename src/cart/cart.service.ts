import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getCartByUser(userId: string): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      cart = await this.cartModel.create({ userId, items: [] });
    }
    return cart;
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    return cart.save();
  }

  async updateQuantity(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) throw new NotFoundException('Product not found in cart');

    cart.items[itemIndex].quantity = quantity;
    return cart.save();
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    cart.items = cart.items.filter(item => item.productId !== productId);
    return cart.save();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    cart.items = [];
    return cart.save();
  }
}
