import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}