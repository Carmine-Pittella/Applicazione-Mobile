import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DettagliUtentePage } from './dettagli-utente.page';

const routes: Routes = [
  {
    path: '',
    component: DettagliUtentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DettagliUtentePageRoutingModule {}
