import { Routes } from '@angular/router';

export const REFRIGERATION_ROUTES: Routes = [
  {
    path: 'items',
    children: [
      {
        path: 'new',
        loadComponent: () => import('./presentation/views/new-refrigeration-item/new-refrigeration-item').then((module) => module.NewRefrigerationItemView),
      },
    ],
  },
];
