import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    @IsString()
     @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    category: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    subCategory: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    image: string;
}
