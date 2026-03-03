import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './auth/entities/admin.entity';

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
      database: "Quike_Mart",
      autoLoadEntities: true,
      synchronize: true,
      entities: [Admin],
    }),
 
      AuthModule,
     
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
