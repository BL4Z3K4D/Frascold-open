import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoolingHub } from '../domain/model/cooling-hub.entity';
import { CoolingHubAssembler } from './cooling-hub-assembler';
import { CoolingHubResource } from './cooling-hub-resource';

@Injectable({ providedIn: 'root' })
export class CoolingHubsApiEndpoint {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.coolingHubApiBaseUrl}${environment.coolingHubApiPath}`;

  getAll(): Observable<CoolingHub[]> {
    return this.http.get<CoolingHubResource[]>(this.url).pipe(
      map((resources) => resources.map(CoolingHubAssembler.toDomain)),
    );
  }
}
