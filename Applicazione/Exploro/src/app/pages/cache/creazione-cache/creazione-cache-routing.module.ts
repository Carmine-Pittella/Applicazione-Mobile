import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreazioneCachePage } from './creazione-cache.page';

const routes: Routes = [
  {
    path: '',
    component: CreazioneCachePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreazioneCachePageRoutingModule {}
