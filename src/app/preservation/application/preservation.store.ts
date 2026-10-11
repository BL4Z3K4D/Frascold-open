import { computed, inject, Injectable, signal } from '@angular/core';
import { PreservationApi } from '../infrastructure/preservation-api';
import { CoolingHub } from '../domain/model/cooling-hub.entity';
import { CoolingType } from '../domain/model/cooling-type';
import { NewRefrigerationItem, RefrigerationItem } from '../domain/model/refrigeration-item.entity';

@Injectable({ providedIn: 'root' })
export class PreservationStore {
  private readonly api = inject(PreservationApi);
  private readonly hubsState = signal<CoolingHub[]>([]);
  private readonly itemsState = signal<RefrigerationItem[]>([]);
  private readonly loadingState = signal(false);
  private readonly savingState = signal(false);
  private readonly errorState = signal<string | null>(null);
  private loaded = false;

  readonly hubs = this.hubsState.asReadonly();
  readonly items = this.itemsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly saving = this.savingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly hubSummaries = computed(() => this.hubs().map((hub) => {
    const items = this.items().filter((item) => item.hubId === hub.id);
    const totalComponents = items.reduce((total, item) => total + item.quantity, 0);
    return { hub, items, totalComponents, availableCapacity: hub.capacity - totalComponents };
  }));

  load(): void {
    if (this.loaded || this.loading()) return;
    this.loadingState.set(true);
    this.errorState.set(null);
    this.api.getOverview().subscribe({
      next: ({ hubs, items }) => {
        this.hubsState.set(hubs);
        this.itemsState.set(items);
        this.loaded = true;
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set('load-error');
        this.loadingState.set(false);
      },
    });
  }

  hubForType(type: CoolingType): CoolingHub | undefined {
    return this.hubs().find((hub) => hub.coolingType === type);
  }

  availableCapacity(hubId: number): number {
    const summary = this.hubSummaries().find(({ hub }) => hub.id === hubId);
    return summary?.availableCapacity ?? 0;
  }

  createItem(item: NewRefrigerationItem, onSuccess: () => void): void {
    const hub = this.hubs().find((candidate) => candidate.id === item.hubId);
    if (!hub || item.quantity > this.availableCapacity(item.hubId)) {
      this.errorState.set('capacity-error');
      return;
    }
    this.savingState.set(true);
    this.errorState.set(null);
    this.api.createItem(item).subscribe({
      next: (createdItem) => {
        this.itemsState.update((items) => [...items, createdItem]);
        this.savingState.set(false);
        onSuccess();
      },
      error: () => {
        this.errorState.set('save-error');
        this.savingState.set(false);
      },
    });
  }
}
