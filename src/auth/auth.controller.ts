import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() dto: any) {
    return this.authService.register(dto);
  }
  
  @Post('admin/login')
  adminLogin(@Body() dto: LoginDto) {
    return this.authService.login(dto, 'admin');
  }

  @Post('customer/login')
  customerLogin(@Body() dto: LoginDto) {
    return this.authService.login(dto, 'customer');
  }

  @Post('logout')
  logout() {
    return this.authService.Logout();
  }


  @Get('admin/all-customers')
  async fetchCustomers() {
    return this.authService.getAllCustomers();
  }

  // @Get('admin/customer-stats')
  // async fetchStats() {
  //   return this.authService.getCustomerStats();
  // }

}

