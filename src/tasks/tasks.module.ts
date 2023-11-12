import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongoDBService } from '../db/mongodb.service';
import { DbModule } from '../db/db.module';

@Module({
  exports: [TasksService],
  providers: [TasksService, MongoDBService],
})
export class TasksModule {}
