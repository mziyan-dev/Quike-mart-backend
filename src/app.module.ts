import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './auth/entities/admin.entity';
import { ProductsModule } from './Products/products.module';
import { Product } from './Products/Entities/product.entity';
import { Customer } from './auth/entities/customer.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/Entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306'),
      username: "root",
      password: process.env.DATABASE_PASSWORD,
      database: "quike_mart",
      autoLoadEntities: true,
      synchronize: true,
      entities: [Admin, Product, Customer, Order],
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
