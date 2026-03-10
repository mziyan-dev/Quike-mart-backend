import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('add')
    async addToCart(@Body() addToCartDto: { customerId: number; productId: number; quantity: number }) {
        return this.cartService.addToCart(addToCartDto);
    }

    @Get('customer/:customerId')
    getCartItems(@Param('customerId') customerId: number) {
        return this.cartService.getCartItems(customerId);
    }
    @Patch('update/:id')
    async updateCartItem(@Param('id') cartItemId: number, @Body() updateCartItemDto: UpdateCartDto) {
        return this.cartService.updateCartItem(cartItemId, updateCartItemDto);
    }

    @Delete('remove/:id')
    async removeFromCart(@Param('id') cartItemId: number) {
        return this.cartService.removeFromCart(cartItemId);
    }

    @Delete('clear/:customerId')
    async clearCart(@Param('customerId') customerId: number) {
        return this.cartService.clearCart(customerId);
    }
}
