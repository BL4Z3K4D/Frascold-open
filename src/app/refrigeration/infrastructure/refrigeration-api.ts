import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CoolingType } from '../../preservation/domain/model/cooling-type';
import { RefrigerationComponent } from '../domain/model/refrigeration-component.entity';
import { RefrigerationApiEndpoint } from './refrigeration-api-endpoint';

@Injectable({ providedIn: 'root' })
export class RefrigerationApi {
  private readonly endpoint = inject(RefrigerationApiEndpoint);

  getComponents(coolingType: CoolingType): Observable<RefrigerationComponent[]> {
    return this.endpoint.getComponents(coolingType);
  }
}
