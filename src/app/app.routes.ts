import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { Collections } from './pages/collections/collections';
import { CollectionDetail } from './pages/collection-detail/collection-detail';
import { AddToCollection } from './pages/add-to-collection/add-to-collection';

export const routes: Routes = [
  { path: '', component: Search },
  { path: 'collections', component: Collections },
  { path: 'collections/:id', component: CollectionDetail },
];