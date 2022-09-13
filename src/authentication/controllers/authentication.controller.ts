import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/signUp.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.createUser(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.getUser(loginDto);
  }
}
