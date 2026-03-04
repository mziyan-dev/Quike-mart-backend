import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './Entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
    ) { }

    async createProduct(productDto: ProductDto): Promise<Product> {
        const product = this.productRepo.create(productDto);
        return this.productRepo.save(product);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepo.find();
    }

    async getProductById(id: number): Promise<Product | null> {
        return this.productRepo.findOne({ where: { id } });
    }

    async updateProduct(id: number, productDto: ProductDto): Promise<Product | null> {
        const product = await this.productRepo.findOne({ where: { id } });
        if (product) {
            this.productRepo.merge(product, productDto);
            return this.productRepo.save(product);
        }
        return null;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await this.productRepo.delete(id);
        return result.affected != null && result.affected > 0;
    }
}
