import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongoDBService } from '../db/mongodb.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, MongoDBService],
})
export class EventsModule {}
