import { CoolingType } from './cooling-type';

export interface RefrigerationItem {
  id: number;
  hubId: number;
  coolingType: CoolingType;
  componentId: number;
  componentName: string;
  quantity: number;
  registeredAt: string;
}

export interface NewRefrigerationItem {
  hubId: number;
  coolingType: CoolingType;
  componentId: number;
  componentName: string;
  quantity: number;
  registeredAt: string;
}
