import { CoolingHub } from '../domain/model/cooling-hub.entity';
import { CoolingHubResource } from './cooling-hub-resource';

export class CoolingHubAssembler {
  static toDomain(resource: CoolingHubResource): CoolingHub {
    return {
      id: resource.id,
      name: resource.name,
      coolingType: resource.coolingType,
      capacity: resource.capacity,
    };
  }
}
