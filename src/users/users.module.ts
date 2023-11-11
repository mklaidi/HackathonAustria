import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SQLiteService } from '../db/sqlite.service';

@Module({
  providers: [UsersService, SQLiteService],
  exports: [UsersService],
})
export class UsersModule {}
