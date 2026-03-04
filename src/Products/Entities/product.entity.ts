import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    subCategory: string;

    @Column()
    description: string;


    @Column()
    image: string;

}