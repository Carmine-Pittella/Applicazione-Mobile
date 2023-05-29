import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggiungiAdminPage } from './aggiungi-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AggiungiAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggiungiAdminPageRoutingModule {}
