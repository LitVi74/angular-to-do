import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./pages/home-page/home-page.component').then(({HomePageComponent}) => HomePageComponent)
  }
];
