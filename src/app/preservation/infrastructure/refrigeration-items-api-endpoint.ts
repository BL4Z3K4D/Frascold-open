import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewRefrigerationItem, RefrigerationItem } from '../domain/model/refrigeration-item.entity';
import { RefrigerationItemAssembler } from './refrigeration-item-assembler';
import { CreateRefrigerationItemRequest, RefrigerationItemResource, RefrigerationItemResponse } from './refrigeration-item-resource';

@Injectable({ providedIn: 'root' })
export class RefrigerationItemsApiEndpoint {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.coolingHubApiBaseUrl}${environment.refrigerationItemApiPath}`;

  getAll(): Observable<RefrigerationItem[]> {
    return this.http.get<RefrigerationItemResource[]>(this.url).pipe(
      map((resources) => resources.map(RefrigerationItemAssembler.toDomain)),
    );
  }

  create(item: NewRefrigerationItem): Observable<RefrigerationItem> {
    const request: CreateRefrigerationItemRequest = RefrigerationItemAssembler.toRequest(item);
    return this.http.post<RefrigerationItemResponse>(this.url, request).pipe(
      map(RefrigerationItemAssembler.toDomain),
    );
  }
}
