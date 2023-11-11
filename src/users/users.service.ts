import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SignupUserDto } from "../api/schema/dto/signup-user.dto";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async create(user: SignupUserDto): Promise<User | undefined> {
    return this.prismaService.user.create({
      data: {
        email: user.email,
        username: user.username,
        fname: user.firstName,
        lname: user.lastName,
        password: user.password,
        role: {
          connect: {
            name: 'localUser',
          },
        },
      },
    });
  }
}
