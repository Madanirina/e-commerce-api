import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCartByUser(userId);
  }

  @Post(':userId/add')
  addToCart(
    @Param('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Patch(':userId/update')
  updateQuantity(
    @Param('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  @Delete(':userId/remove/:productId')
  removeFromCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete(':userId/clear')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
