import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/utils/auth';
import { AuthenticationService } from '../services/authentication.service';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/signUp.dto';
import { JwtAuthGuard } from '../guards/jwt-authorization.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.createUser(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.getUser(loginDto);
  }
}
