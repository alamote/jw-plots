import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AppLanguage } from './i18n/translations';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly i18n = inject(LocalizationService);

  setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }
}
