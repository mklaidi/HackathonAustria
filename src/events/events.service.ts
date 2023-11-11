import { Injectable } from '@nestjs/common';
import { MongoDBService } from '../db/mongodb.service';

@Injectable()
export class EventsService {
  constructor(private mongodbService: MongoDBService) {}

  findAll() {
    return this.mongodbService.event.findMany({
      where: {
        title: {
          startsWith: 'Kl',
        },
      },
    });
  }
}
