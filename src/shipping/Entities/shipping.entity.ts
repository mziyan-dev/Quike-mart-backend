import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';

import { Order } from '../../orders/Entities/order.entity';

@Entity()
export class Shipment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order)
  order: Order;

  @Column()
  trackingNumber: string;

  @Column()
  carrier: string;
  // example: DHL, FedEx, TCS

  @Column({
    default: 'pending'
  })
  status: string;
  // pending | shipped | in_transit | delivered

  @Column()
  estimatedDelivery: Date;

  @CreateDateColumn()
  createdAt: Date;
}