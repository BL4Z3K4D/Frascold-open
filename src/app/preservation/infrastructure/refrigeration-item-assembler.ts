import { NewRefrigerationItem, RefrigerationItem } from '../domain/model/refrigeration-item.entity';
import { CreateRefrigerationItemRequest, RefrigerationItemResource } from './refrigeration-item-resource';

export class RefrigerationItemAssembler {
  static toDomain(resource: RefrigerationItemResource): RefrigerationItem {
    return {
      id: resource.id,
      hubId: resource.hubId,
      coolingType: resource.coolingType,
      componentId: resource.componentId,
      componentName: resource.componentName,
      quantity: resource.quantity,
      registeredAt: resource.registeredAt,
    };
  }

  static toRequest(item: NewRefrigerationItem): CreateRefrigerationItemRequest {
    return {
      hubId: item.hubId,
      coolingType: item.coolingType,
      componentId: item.componentId,
      componentName: item.componentName,
      quantity: item.quantity,
      registeredAt: item.registeredAt,
    };
  }
}
