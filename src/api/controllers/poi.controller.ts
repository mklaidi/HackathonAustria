import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param, Query
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PoiService } from '../services/poi.service';

@Controller('poi')
export class PoiController {
  constructor(private poiService: PoiService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get POI',
    description: 'Gets Places',
  })
  @ApiOkResponse({
    description: 'Places successfully fetched.',
  })
  @Post('getPlaces')
  async getPlaces(@Query('city') city: string) {
    console.log(city);
    return this.poiService.findAll(city);
  }
}
