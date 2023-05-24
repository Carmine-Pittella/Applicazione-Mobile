import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DettagliCachePage } from './dettagli-cache.page';

const routes: Routes = [
  {
    path: '',
    component: DettagliCachePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DettagliCachePageRoutingModule {}
