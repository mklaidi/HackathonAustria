import { PrismaClient } from '@prisma-sqlite/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SQLiteService extends PrismaClient {}
