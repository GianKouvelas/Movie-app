import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { Collections } from './pages/collections/collections';

export const routes: Routes = [
  { path: '', component: Search },
  { path: 'collections', component: Collections },
];