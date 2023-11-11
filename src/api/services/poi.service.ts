import { Injectable } from '@nestjs/common';
import { MongoDBService } from '../../db/mongodb.service';

@Injectable()
export class PoiService {
  constructor(private mongodbService: MongoDBService) {}

  async findAll(city: string) {
    return this.mongodbService.poi.findMany({
      where: {
        city: {
          equals: city,
          mode: 'insensitive',
        },
      },
    });
  }
}
