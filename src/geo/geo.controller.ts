import { Controller, Get, Query } from '@nestjs/common';
import { GeoService } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private geoService: GeoService) {}

  @Get()
  async getFlux(@Query('region') region: string) {
    return await this.geoService.distanceFromFeature(region);
  }
}
