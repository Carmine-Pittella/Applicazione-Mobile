import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'utenti-registrati',
    loadChildren: () => import('./utenti-registrati/utenti-registrati.module').then( m => m.UtentiRegistratiPageModule)
  },
  {
    path: 'lista-cache',
    loadChildren: () => import('./lista-cache/lista-cache.module').then( m => m.ListaCachePageModule)
  },
  {
    path: 'richieste-approvazione',
    loadChildren: () => import('./richieste-approvazione/richieste-approvazione.module').then( m => m.RichiesteApprovazionePageModule)
  },  {
    path: 'aggiungi-admin',
    loadChildren: () => import('./aggiungi-admin/aggiungi-admin.module').then( m => m.AggiungiAdminPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
