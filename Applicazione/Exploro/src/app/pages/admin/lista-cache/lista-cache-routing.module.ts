import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCachePage } from './lista-cache.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCachePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCachePageRoutingModule {}
