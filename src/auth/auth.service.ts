import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity'
import { LoginDto } from './dto/login.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) { }

async login(dto: LoginDto, userType: 'admin' | 'customer') {
  const { email, password } = dto;
  let user: Customer | Admin | null;

  if (userType === 'admin') {
    user = await this.adminRepository.findOne({ where: { email } });
  } else {
    user = await this.customerRepository.findOne({ where: { email } });
  }

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (userType === 'admin') {
      user = this.adminRepository.create({ email, password: hashedPassword, role: 'admin' });
      await this.adminRepository.save(user);
    } else {
      user = this.customerRepository.create({ email, password: hashedPassword, role: 'customer' });
      await this.customerRepository.save(user);
    }
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  return {
    access_token: await this.jwtService.signAsync(payload),
    role: user.role,
    message: 'Login successful',
  };
}
  async validateAdmin(id: number): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { id } });
  }


  async Logout() {
    return {
      message: 'Logout successful',
      access_token: '',
    };
  }
  async getAllCustomers() {
    return await this.customerRepository.find({
      select: ['id', 'email', 'createdAt'],
      order: { createdAt: 'DESC' }
    });
  }

  async getCustomerStats() {
    const total = await this.customerRepository.count();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newToday = await this.customerRepository.count({
      where: { createdAt: MoreThan(today) } 
    });

    return { total, newToday };
  }
}
