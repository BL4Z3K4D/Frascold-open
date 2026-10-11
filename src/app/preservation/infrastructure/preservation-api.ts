import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CoolingHub } from '../domain/model/cooling-hub.entity';
import { NewRefrigerationItem, RefrigerationItem } from '../domain/model/refrigeration-item.entity';
import { CoolingHubsApiEndpoint } from './cooling-hubs-api-endpoint';
import { RefrigerationItemsApiEndpoint } from './refrigeration-items-api-endpoint';

@Injectable({ providedIn: 'root' })
export class PreservationApi {
  private readonly hubsEndpoint = inject(CoolingHubsApiEndpoint);
  private readonly itemsEndpoint = inject(RefrigerationItemsApiEndpoint);

  getOverview(): Observable<{ hubs: CoolingHub[]; items: RefrigerationItem[] }> {
    return forkJoin({ hubs: this.hubsEndpoint.getAll(), items: this.itemsEndpoint.getAll() });
  }

  createItem(item: NewRefrigerationItem): Observable<RefrigerationItem> {
    return this.itemsEndpoint.create(item);
  }
}
