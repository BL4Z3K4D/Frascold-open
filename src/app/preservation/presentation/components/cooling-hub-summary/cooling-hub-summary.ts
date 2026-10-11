import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { CoolingHub } from '../../../domain/model/cooling-hub.entity';
import { RefrigerationItem } from '../../../domain/model/refrigeration-item.entity';

@Component({
  selector: 'app-cooling-hub-summary',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardFooter, TranslatePipe],
  templateUrl: './cooling-hub-summary.html',
  styleUrl: './cooling-hub-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoolingHubSummary {
  @Input({ required: true }) hub!: CoolingHub;
  @Input() items: RefrigerationItem[] = [];
  @Input() totalComponents = 0;
  @Input() availableCapacity = 0;
}
