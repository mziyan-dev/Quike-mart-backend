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

        // Simple check
        if (!item) {
            return { success: false, message: 'Cart item not found' };
        }

        // Update item
        Object.assign(item, updateData);
        const updatedItem = await this.cartRepository.save(item);

        return { success: true, data: updatedItem };
    }

    async removeFromCart(cartItemId: number): Promise<void> {
        await this.cartRepository.delete(cartItemId);
    }

    async clearCart(customerId: number): Promise<void> {
        await this.cartRepository.delete({ customer: { id: customerId } });
    }


}
