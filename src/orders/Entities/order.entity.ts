import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Customer } from '../../auth/entities/customer.entity';
import { ManyToOne } from 'typeorm';
import { Product } from 'src/Products/Entities/product.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;
    @ManyToOne(() => Customer)
    customer: Customer;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];


    @Column()
    totalAmount: number;

    @Column({
        default: 'pending'
    })
    status: string;
    // pending | processing | shipped | delivered | cancelled

    @Column({
        default: 'unpaid'
    })
    paymentStatus: string;
    // unpaid | paid

    @Column()
    shippingAddress: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}


@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    price: number;
}