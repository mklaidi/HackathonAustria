import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma-mongodb/client';

@Injectable()
export class MongoDBService extends PrismaClient {}
