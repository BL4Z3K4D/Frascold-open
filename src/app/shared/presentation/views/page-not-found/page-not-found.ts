import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, RouterLink, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFound {
  private readonly router = inject(Router);
  readonly requestedPath = this.router.url;
}
