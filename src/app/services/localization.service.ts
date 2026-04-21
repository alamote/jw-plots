import { Injectable, signal } from '@angular/core';

import { Plot, PlotStatus } from '../models/plot.model';
import { AppLanguage, TranslationKey, translations } from '../i18n/translations';

const STORAGE_KEY = 'jw-plots.language';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private readonly languageSignal = signal<AppLanguage>(this.getInitialLanguage());

  readonly language = this.languageSignal.asReadonly();
  readonly supportedLanguages: AppLanguage[] = ['uk', 'ru'];

  setLanguage(language: AppLanguage): void {
    this.languageSignal.set(language);
    localStorage.setItem(STORAGE_KEY, language);
  }

  t(key: TranslationKey): string {
    return translations[this.languageSignal()][key];
  }

  status(status: PlotStatus): string {
    return this.t(`status.${status}`);
  }

  priority(priority: Plot['priority']): string {
    return this.t(`priority.${priority}`);
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat(this.languageSignal() === 'uk' ? 'uk-UA' : 'ru-RU', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  }

  private getInitialLanguage(): AppLanguage {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'uk' || stored === 'ru' ? stored : 'uk';
  }
}
