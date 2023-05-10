import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferitiPage } from './preferiti.page';

const routes: Routes = [
  {
    path: '',
    component: PreferitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferitiPageRoutingModule {}
