import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtentiRegistratiPage } from './utenti-registrati.page';

const routes: Routes = [
  {
    path: '',
    component: UtentiRegistratiPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtentiRegistratiPageRoutingModule { }
