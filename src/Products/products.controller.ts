import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';



@Controller('products')
@ApiTags('Products') // 👈 ye important hai
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get('All')
    getAllProducts() {
        return this.productsService.getAllProducts();
    }


    @Get(':id')
    getProductById(@Param() param:{id: number}) {
        return this.productsService.getProductById(param.id);
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
