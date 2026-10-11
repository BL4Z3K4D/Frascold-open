import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { PageNotFound } from './shared/presentation/views/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () => import('./preservation/preservation.routes').then((module) => module.PRESERVATION_ROUTES),
      },
      {
        path: 'refrigeration',
        loadChildren: () => import('./refrigeration/refrigeration.routes').then((module) => module.REFRIGERATION_ROUTES),
      },
      { path: '**', component: PageNotFound },
    ],
  },
];
