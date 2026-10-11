import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PreservationStore } from '../../../../preservation/application/preservation.store';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { LogoDevApi } from '../../../infrastructure/logo-dev-api';

@Component({
  selector: 'app-layout',
  imports: [MatToolbar, RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe, LanguageSwitcher],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout implements OnInit {
  private readonly store = inject(PreservationStore);
  private readonly logoApi = inject(LogoDevApi);
  readonly logoUrl = this.logoApi.getFrascoldLogoUrl();

  ngOnInit(): void {
    this.store.load();
  }
}
