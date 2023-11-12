export class RegionDetailsDto {
  info: RTInfoDTO;
  regionsDTO: RegionDTO[];
}

export class RegionDTO {
  id: string;
  info: RTInfoDTO;
  distance: number;
}

export class RTInfoDTO {
  flux: number;
  visitors: number;
}
