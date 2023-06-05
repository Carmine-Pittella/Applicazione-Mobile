import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtentiRegistratiPage } from './utenti-registrati.page';

const routes: Routes = [
  {
    path: '',
    component: UtentiRegistratiPage
  },
  {
    path: 'scheda-utente',
    loadChildren: () => import('./scheda-utente/scheda-utente.module').then( m => m.SchedaUtentePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtentiRegistratiPageRoutingModule { }
