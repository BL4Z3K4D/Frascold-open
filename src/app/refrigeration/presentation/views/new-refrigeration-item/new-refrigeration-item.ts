import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { COOLING_TYPES, CoolingType } from '../../../../preservation/domain/model/cooling-type';
import { PreservationStore } from '../../../../preservation/application/preservation.store';
import { RefrigerationStore } from '../../../application/refrigeration.store';

@Component({
  selector: 'app-new-refrigeration-item',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatHint, MatError, MatSelect, MatOption, MatInput, MatButton, TranslatePipe],
  templateUrl: './new-refrigeration-item.html',
  styleUrl: './new-refrigeration-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRefrigerationItemView {
  private readonly preservationStore = inject(PreservationStore);
  private readonly refrigerationStore = inject(RefrigerationStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly coolingTypes = COOLING_TYPES;
  readonly components = this.refrigerationStore.components;
  readonly loadingComponents = this.refrigerationStore.loading;
  readonly componentError = this.refrigerationStore.error;
  readonly saving = this.preservationStore.saving;
  readonly saveError = this.preservationStore.error;
  readonly form = new FormGroup({
    coolingType: new FormControl<CoolingType | ''>('', Validators.required),
    componentId: new FormControl<number | null>(null, Validators.required),
    quantity: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  });

  constructor() {
    this.preservationStore.load();
    this.form.controls.coolingType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((type) => {
        this.form.controls.componentId.reset();
        if (type) this.refrigerationStore.loadComponents(type);
      });
  }

  get selectedCoolingType(): CoolingType | null {
    const type = this.form.controls.coolingType.value;
    return type || null;
  }

  get selectedHub() {
    return this.selectedCoolingType ? this.preservationStore.hubForType(this.selectedCoolingType) : undefined;
  }

  get availableCapacity(): number {
    return this.selectedHub ? this.preservationStore.availableCapacity(this.selectedHub.id) : 0;
  }

  create(): void {
    this.form.markAllAsTouched();
    const { coolingType, componentId, quantity } = this.form.getRawValue();
    const hub = coolingType ? this.preservationStore.hubForType(coolingType) : undefined;
    const component = this.components().find((candidate) => candidate.id === componentId);
    if (!this.form.valid || !hub || !component || quantity === null || !coolingType) {
      return;
    }
    this.preservationStore.createItem({
      hubId: hub.id,
      coolingType,
      componentId: component.id,
      componentName: component.name,
      quantity,
      registeredAt: new Date().toISOString(),
    }, () => void this.router.navigate(['/home']));
  }

  cancel(): void {
    void this.router.navigate(['/home']);
  }
}
