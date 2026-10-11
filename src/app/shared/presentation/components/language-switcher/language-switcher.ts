import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);
  readonly languages = ['en', 'es'];
  readonly currentLanguage = this.translate.currentLang;

  constructor() {
    if (!this.currentLanguage()) this.useLanguage('en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
