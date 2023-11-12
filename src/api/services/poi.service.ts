import { Injectable } from '@nestjs/common';
import { MongoDBService } from '../../db/mongodb.service';

@Injectable()
export class PoiService {
  constructor(private mongodbService: MongoDBService) {}

  async findAll(qry: string, offset: number, limit: number) {
    console.log(qry);
    return this.mongodbService.poi.findMany({
      where: {
        OR: [
          {
            city: {
              contains: qry,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: qry,
              mode: 'insensitive',
            },
          },
          {
            areas: {
              has: qry,
            },
          },
        ],
      },
      orderBy: {
        score: 'desc',
      },
      skip: offset,
      take: limit,
    });
  }
}
