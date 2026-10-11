import { CoolingType } from './cooling-type';

export interface CoolingHub {
  id: number;
  name: string;
  coolingType: CoolingType;
  capacity: number;
}
