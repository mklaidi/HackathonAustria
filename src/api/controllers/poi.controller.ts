import { Controller, HttpCode, HttpStatus, Query, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
  @Get('getPlaces')
  async getPlaces(
    @Query('q') q: string,
    @Query('limit') limit: number | undefined,
    @Query('offset') offset: number | undefined,
  ) {
    offset = Number.parseInt(String(offset));
    limit = Number.parseInt(String(limit));
    return this.poiService.findAll(q, offset ?? 0, limit ?? 20);
  }
}
