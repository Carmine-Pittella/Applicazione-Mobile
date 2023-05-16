import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CachePage } from './cache.page';

const routes: Routes = [
  {
    path: '',
    component: CachePage
  },  {
    path: 'dettagli-cache',
    loadChildren: () => import('./dettagli-cache/dettagli-cache.module').then( m => m.DettagliCachePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CachePageRoutingModule {}
