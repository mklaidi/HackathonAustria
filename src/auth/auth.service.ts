import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupUserDto } from '../api/schema/dto/signup-user.dto';
import { LoginRequestDto } from '../api/schema/dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const userExist = await this.usersService.findOne(username);
    if (!userExist) {
      throw new UnauthorizedException();
    }
    const passwordMatches = await bcrypt.compare(password, userExist.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }
    if (userExist && passwordMatches) {
      const { password, ...result } = userExist;
      return result;
    }
    return null;
  }

  async getProfile(token: string): Promise<any> {
    console.log('\n' + token + '\n');
    const [type, tokenName] = token?.split(' ') ?? [];
    const payload = this.jwtService.decode(tokenName);
    return payload;
  }
  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: SignupUserDto) {
    // Check if user exists
    const userExists = await this.usersService.findOne(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    // Hash password
    user.password = await this.hashText(user.password);
    const newUser = await this.usersService.create(user);

    const payload = { username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashText(text: string) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    return await bcrypt.hash(text, salt);
  }
}
