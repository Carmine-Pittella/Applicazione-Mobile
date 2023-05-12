import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmiciPage } from './amici.page';

const routes: Routes = [
  {
    path: '',
    component: AmiciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmiciPageRoutingModule {}
