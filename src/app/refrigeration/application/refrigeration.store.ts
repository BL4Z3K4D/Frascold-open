import { inject, Injectable, signal } from '@angular/core';
import { RefrigerationApi } from '../infrastructure/refrigeration-api';
import { CoolingType } from '../../preservation/domain/model/cooling-type';
import { RefrigerationComponent } from '../domain/model/refrigeration-component.entity';

@Injectable({ providedIn: 'root' })
export class RefrigerationStore {
  private readonly api = inject(RefrigerationApi);
  private readonly componentsState = signal<RefrigerationComponent[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly components = this.componentsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  loadComponents(type: CoolingType): void {
    this.loadingState.set(true);
    this.errorState.set(null);
    this.componentsState.set([]);
    this.api.getComponents(type).subscribe({
      next: (components) => {
        this.componentsState.set(components);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set('components-error');
        this.loadingState.set(false);
      },
    });
  }
}
