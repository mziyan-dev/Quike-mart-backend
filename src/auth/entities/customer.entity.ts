import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: "customer" })
    role: string;

    @OneToMany(() => Cart, (cart) => cart.customer)
    cartItems: Cart[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}