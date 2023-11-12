import { Injectable } from '@nestjs/common';
import {
  RegionDetailsDto,
  RegionDTO,
  RTInfoDTO,
} from './dto/region-details.dto';
import { MongoDBService } from '../db/mongodb.service';
import turf = require('@turf/turf');

@Injectable()
export class GeoService {
  constructor(private mongodbService: MongoDBService) {}

  async distanceFromFeature(featureName) {
    const currentFeature = data.features.find((f) => {
      if (f.id == featureName.toLowerCase()) return true;
    });
    const currentGeometry = currentFeature.geometry;
    const res = new RegionDetailsDto();
    res.regionsDTO = [];

    for (const feature of data.features) {
      console.log(feature.id);
      const visit = await this.mongodbService.visit.findFirst({
        where: {
          feature_id: feature.id,
        },
      });
      console.log(visit);
      res.info = {
        visitors: visit.visitors,
        flux: await this.calculateRate(feature.id),
      };
      if (feature.id != currentFeature.id) {
        res.regionsDTO.push({
          id: feature.id,
          info: {
            visitors: visit.visitors,
            flux: await this.calculateRate(feature.id),
          },
          distance: turf.distance(
            turf.centroid(currentGeometry),
            turf.centroid(feature.geometry),
          ),
        });
      }
    }
    return res;
  }

  async calculateRate(featureId) {
    const records = await this.mongodbService.visit.findMany({
      where: {
        feature_id: featureId,
      },
    });
    const groupedData = this.groupByFeatureId(records);
    return this.analyzeTrend(groupedData, featureId);
  }

  groupByFeatureId(records) {
    const groupedData = new Map();

    records.forEach((record) => {
      const featureId = record.feature_id;
      const existingRecords = groupedData.get(featureId) || [];
      existingRecords.push(record);
      groupedData.set(featureId, existingRecords);
    });
    console.log('HERE: ');
    console.log(groupedData);
    return groupedData;
  }

  analyzeTrend(groupedData, featureId) {
    const averageVisitorsArray = [];

    groupedData.forEach((records, featureId) => {
      const averageVisitors = this.calculateAverageVisitors(records);
      averageVisitorsArray.push(averageVisitors);
      console.log(
        `At ${featureId}, the average number of visitors was ${averageVisitors}`,
      );
    });
    const ratesOfChange = this.calculateRateOfChange(
      groupedData.get(featureId),
    );
    console.log(ratesOfChange);

    console.log('\nRates of Change:');

    ratesOfChange.forEach((rate, index) => {
      const time = Array.from(groupedData.keys())[index + 1];
      console.log(
        `Between ${time} and ${
          Array.from(groupedData.keys())[index]
        }, the rate of change was ${rate}`,
      );
    });

    return ratesOfChange[ratesOfChange.length - 1];
  }

  calculateAverageVisitors(records) {
    return (
      records
        .map((record) => record.visitors)
        .reduce((acc, visitors) => acc + visitors, 0) / records.length
    );
  }

  calculateRateOfChange(visits) {
    console.log(visits);
    const rates = [];

    for (let i = 1; i < visits.length; i++) {
      const rate = (visits[i].visitors - visits[i - 1].visitors9) / 15; // Assuming 15-minute intervals
      rates.push(rate);
    }
    return rates;
  }
}

const data = {
  type: 'FeatureCollection',
  features: [
    {
      id: 'attersee',
      type: 'Feature',
      properties: {
        name: 'attersee',
      },
      geometry: {
        coordinates: [
          [
            [13.538598252940801, 47.915030998897294],
            [13.536637961139917, 47.91446102964133],
            [13.533017306898955, 47.913533743863326],
            [13.5303974839116, 47.91166925727077],
            [13.533694339805834, 47.910080937927404],
            [13.539036051694211, 47.9137541804312],
            [13.538598252940801, 47.915030998897294],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'litzlberg',
      type: 'Feature',
      properties: {
        name: 'litzlberg',
      },
      geometry: {
        coordinates: [
          [
            [13.558537835910272, 47.935229585058664],
            [13.560086850333505, 47.933710382932134],
            [13.564649910894758, 47.935648451868985],
            [13.566898781232624, 47.937811501092085],
            [13.565097818679988, 47.93922431097553],
            [13.563940723568237, 47.93949936681696],
            [13.560581415180422, 47.93784900981797],
            [13.559172371939354, 47.9360860702854],
            [13.558537835910272, 47.935229585058664],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'seewalchen',
      type: 'Feature',
      properties: {
        name: 'seewalchen',
      },
      geometry: {
        coordinates: [
          [
            [13.588342824101119, 47.95029592699399],
            [13.59142903431649, 47.94852696477082],
            [13.594178926751425, 47.949076873370586],
            [13.591834593991933, 47.950772940149506],
            [13.590449756074833, 47.951501701746366],
            [13.588708816980045, 47.950918693291044],
            [13.588342824101119, 47.95029592699399],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'schonauer',
      type: 'Feature',
      properties: {
        name: 'schonauer',
      },
      geometry: {
        coordinates: [
          [
            [13.593239080561943, 47.94235818092449],
            [13.593169236862451, 47.941666772092304],
            [13.593646502143656, 47.9409597580092],
            [13.59580777662947, 47.94136785187695],
            [13.595648688202402, 47.942714278858006],
            [13.593239080561943, 47.94235818092449],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'weyregg',
      type: 'Feature',
      properties: {
        name: 'weyregg',
      },
      geometry: {
        coordinates: [
          [
            [13.567685963266342, 47.907501628234314],
            [13.564443701260672, 47.90560925084412],
            [13.564052393788955, 47.902086621719945],
            [13.56879000924883, 47.900137830281864],
            [13.57076052187378, 47.906405556653624],
            [13.567685963266342, 47.907501628234314],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'seefeld',
      type: 'Feature',
      properties: {
        name: 'seefeld',
      },
      geometry: {
        coordinates: [
          [
            [13.5461060470721, 47.84170492436644],
            [13.542174939226811, 47.840609918214284],
            [13.541252890867696, 47.837087419038824],
            [13.546681773728011, 47.83512073090188],
            [13.547630283809553, 47.84087861703429],
            [13.5461060470721, 47.84170492436644],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'weissenbach',
      type: 'Feature',
      properties: {
        name: 'weissenbach',
      },
      geometry: {
        coordinates: [
          [
            [13.541415265992612, 47.801233147391116],
            [13.5380915447208, 47.8021860601834],
            [13.532508098316953, 47.80096088338283],
            [13.528485179582816, 47.797611919368705],
            [13.5340888925804, 47.79629814079428],
            [13.540331003260377, 47.79838111109504],
            [13.541415265992612, 47.801233147391116],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'unterach',
      type: 'Feature',
      properties: {
        name: 'unterach',
      },
      geometry: {
        coordinates: [
          [
            [13.482734558428916, 47.80215854885208],
            [13.486103279513912, 47.801027163885436],
            [13.488558006506622, 47.80319343755414],
            [13.48659944773658, 47.80457910370089],
            [13.48325684076778, 47.80394766548372],
            [13.482734558428916, 47.80215854885208],
          ],
        ],
        type: 'Polygon',
      },
    },
    {
      id: 'nussdorf',
      type: 'Feature',
      properties: {
        name: 'nussdorf',
      },
      geometry: {
        coordinates: [
          [
            [13.52635767350722, 47.88215813409741],
            [13.524093812648573, 47.87716927414925],
            [13.529069331019457, 47.87581769427274],
            [13.534641911596424, 47.88027276858185],
            [13.529765903591567, 47.88297566064833],
            [13.52635767350722, 47.88215813409741],
          ],
        ],
        type: 'Polygon',
      },
    },
  ],
};
