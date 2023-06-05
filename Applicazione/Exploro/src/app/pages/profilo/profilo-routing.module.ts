import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfiloPage } from './profilo.page';

const routes: Routes = [
  {
    path: '',
    component: ProfiloPage
  },
  {
    path: 'modifica-dati',
    loadChildren: () => import('./modifica-dati/modifica-dati.module').then( m => m.ModificaDatiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiloPageRoutingModule {}
