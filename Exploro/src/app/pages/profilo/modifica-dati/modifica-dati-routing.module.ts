import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaDatiPage } from './modifica-dati.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaDatiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaDatiPageRoutingModule {}
