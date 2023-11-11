import { Module } from '@nestjs/common';
import { MongoDBService } from './mongodb.service';
import { SQLiteService } from './sqlite.service';

@Module({
  providers: [SQLiteService, MongoDBService],
  exports: [SQLiteService, MongoDBService],
})
export class DbModule {}
