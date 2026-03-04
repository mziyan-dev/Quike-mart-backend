import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get('All')
    getAllProducts() {
        return this.productsService.getAllProducts();
    }


    @Get(':id')
    getProductById(id: number) {
        return this.productsService.getProductById(id);
    }

    @Post('create')
    createProduct(@Body() productDto: any) {
        return this.productsService.createProduct(productDto);
    }

    @Put(':id')
    updateProduct(id: number, @Body() productDto: any) {
        return this.productsService.updateProduct(id, productDto);
    }

    @Delete(':id')
    deleteProduct(id: number) {
        return this.productsService.deleteProduct(id);
    }

}
