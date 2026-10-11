import { RefrigerationComponent } from '../domain/model/refrigeration-component.entity';
import { RefrigerationComponentResource } from './refrigeration-component-resource';

export class RefrigerationComponentAssembler {
  static toDomain(resource: RefrigerationComponentResource): RefrigerationComponent {
    return {
      id: resource.id,
      name: resource.name,
      manufacturer: resource.manufacturer,
      location: resource.location,
      image: resource.image,
    };
  }
}
