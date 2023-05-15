import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedaUtentePage } from './scheda-utente.page';

const routes: Routes = [
  {
    path: '',
    component: SchedaUtentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedaUtentePageRoutingModule {}
