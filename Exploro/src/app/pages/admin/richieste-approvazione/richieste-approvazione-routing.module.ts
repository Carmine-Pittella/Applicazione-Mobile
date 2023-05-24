import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RichiesteApprovazionePage } from './richieste-approvazione.page';

const routes: Routes = [
  {
    path: '',
    component: RichiesteApprovazionePage
  },
  {
    path: 'dettagli-cache',
    loadChildren: () => import('./dettagli-cache/dettagli-cache.module').then( m => m.DettagliCachePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RichiesteApprovazionePageRoutingModule {}
