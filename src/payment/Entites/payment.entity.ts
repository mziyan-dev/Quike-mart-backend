import { Order } from 'src/orders/Entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column('decimal')
    amount: number;

    @Column()
    paymentMethod: string;

    @ManyToOne(() => Order, order => order.paymentStatus)
    order: Order;

    @Column({ default: 'pending' })
    status: string;

    @Column({ nullable: true })
    transactionId: string;

    @CreateDateColumn()
    createdAt: Date;

}