import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoolingType } from '../../preservation/domain/model/cooling-type';
import { RefrigerationComponent } from '../domain/model/refrigeration-component.entity';
import { RefrigerationComponentAssembler } from './refrigeration-component-assembler';
import { RefrigerationComponentResource } from './refrigeration-component-resource';

@Injectable({ providedIn: 'root' })
export class RefrigerationApiEndpoint {
  private readonly http = inject(HttpClient);

  getComponents(coolingType: CoolingType): Observable<RefrigerationComponent[]> {
    const url = `${environment.sampleApiBaseUrl}/${coolingType}`;
    return this.http.get<RefrigerationComponentResource[]>(url).pipe(
      map((resources) => resources.map(RefrigerationComponentAssembler.toDomain)),
    );
  }
}
