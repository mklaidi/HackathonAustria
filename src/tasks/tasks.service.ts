import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoDBService } from '../db/mongodb.service';

@Injectable()
export class TasksService {
  constructor(private mongodbService: MongoDBService) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('00 00 * * 1-7')
  async calculateRankingScore() {
    this.logger.debug('Recalculate score');
    const res = await this.mongodbService.poi.findMany();
    for (const poi of res) {
      console.log(poi.id);
      let calculatedScore = 0;
      if (poi.ratings.length > 0) {
        for (const rating of poi.ratings) {
          calculatedScore += rating.value;
        }
        calculatedScore /= poi.ratings.length;
        const coefficient = 0.2;
        calculatedScore =
          calculatedScore * (1 - coefficient) +
          (poi.ratings.length > 8 ? 8 : poi.ratings.length / 8.0) *
            coefficient *
            100.0;
      }

      await this.mongodbService.poi.update({
        where: {
          id: poi.id,
        },
        data: {
          score: Math.floor(calculatedScore),
        },
      });
    }
  }
}
