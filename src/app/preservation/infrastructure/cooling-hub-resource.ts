import { CoolingType } from '../domain/model/cooling-type';

export interface CoolingHubResource {
  id: number;
  name: string;
  coolingType: CoolingType;
  capacity: number;
}
