import { CoolingType } from '../domain/model/cooling-type';

export interface RefrigerationItemResource {
  id: number;
  hubId: number;
  coolingType: CoolingType;
  componentId: number;
  componentName: string;
  quantity: number;
  registeredAt: string;
}

export type CreateRefrigerationItemRequest = Omit<RefrigerationItemResource, 'id'>;
export interface RefrigerationItemResponse extends RefrigerationItemResource {}
