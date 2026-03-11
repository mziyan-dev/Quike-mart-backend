import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Product } from 'src/Products/Entities/product.entity';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }

    async addToCart(createCartDto: CreateCartDto) {
        const product = await this.productRepository.findOne({
            where: { id: createCartDto.productId }
        });
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        const cart = new Cart();
        cart.product = product;
        cart.quantity = createCartDto.quantity;
        cart.customer = { id: createCartDto.customerId } as any; // Assuming you have a Customer entity and relation set up
        return await this.cartRepository.save(cart);
    }


    async getCartItems(customerId: number): Promise<Cart[]> {
        return this.cartRepository.find({
            where: { customer: { id: customerId } },
            relations: ['product'],
        });
    }

    async updateCartItem(cartItemId: number, updateData: UpdateCartDto): Promise<{ success: boolean; data?: Cart; message?: string }> {
        const item = await this.cartRepository.findOne({ where: { id: cartItemId } });

        if (!item) {
            return { success: false, message: 'Cart item not found' };
        }

        Object.assign(item, updateData);
        const updatedItem = await this.cartRepository.save(item);

        return { success: true, data: updatedItem };
    }

    async removeFromCart(cartItemId: number): Promise<{ success: boolean; message: string }> {
        await this.cartRepository.delete(cartItemId);
        return { success: true, message: 'Cart item removed successfully' };
    }

    async clearCart(customerId: number): Promise<{ success: boolean; message: string }> {
        await this.cartRepository.delete({ customer: { id: customerId } });
        return { success: true, message: 'Cart cleared successfully' };
    }


}
