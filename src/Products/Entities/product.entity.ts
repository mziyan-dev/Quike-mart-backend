import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/orders/Entities/order.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => Order, order => order.products)
    orders: Order[];

    @OneToMany(() => Cart, (cart) => cart.product)
    cartItems: Cart[];

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