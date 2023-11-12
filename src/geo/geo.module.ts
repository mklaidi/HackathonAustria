import { Module } from '@nestjs/common';
import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';
import { MongoDBService } from '../db/mongodb.service';

@Module({
  providers: [GeoService, MongoDBService],
  controllers: [GeoController],
})
export class GeoModule {}
