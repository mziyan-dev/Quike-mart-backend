import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Admin} from './entities/admin.entity'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: 'admin',
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }
}