import { hashPassword, verifyPassword } from '../../utils/auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/signUp.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userSignUpDetails: SignUpDto) {
    const user = await this.userRepository.findOneBy({
      email: userSignUpDetails.email,
    });

    if (user) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = this.userRepository.create({
      ...userSignUpDetails,
      password: await hashPassword(userSignUpDetails.password),
    });

    const createdUser = await this.userRepository.save(newUser);

    return {
      id: createdUser.id,
      email: createdUser.email,
    };
  }

  async getUser(userLoginDetails: LoginDto) {
    const user = await this.userRepository.findOneBy({
      email: userLoginDetails.email,
    });

    if (!user) {
      throw new HttpException('Something went wrong', HttpStatus.UNAUTHORIZED);
    }

    if (!(await verifyPassword(userLoginDetails.password, user.password))) {
      throw new HttpException('Something went wrong', HttpStatus.UNAUTHORIZED);
    }

    const acces_token = this.jwtService.sign({
      username: user.email,
      sub: user.id,
    });

    return {
      id: user.id,
      email: user.email,
      acces_token,
    };
  }
}
