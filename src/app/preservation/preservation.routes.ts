import { Routes } from '@angular/router';

export const PRESERVATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/views/home/home').then((module) => module.Home),
  },
];
