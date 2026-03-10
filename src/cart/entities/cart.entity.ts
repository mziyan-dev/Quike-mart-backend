import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from '../../Products/Entities/product.entity';
import { Customer } from 'src/auth/entities/customer.entity';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.cartItems)
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

}