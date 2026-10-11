import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { PreservationStore } from '../../../application/preservation.store';
import { CoolingHubSummary } from '../../components/cooling-hub-summary/cooling-hub-summary';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, CoolingHubSummary, MatProgressSpinner],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly store = inject(PreservationStore);
}
