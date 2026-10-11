import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogoDevApi {
  getFrascoldLogoUrl(): string {
    const domain = 'frascold.it';
    return `${environment.logoDevBaseUrl}${domain}?token=${environment.logoDevToken}`;
  }
}
