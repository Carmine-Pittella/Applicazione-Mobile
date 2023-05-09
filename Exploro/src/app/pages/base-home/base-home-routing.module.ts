import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseHomePage } from './base-home.page';

const routes: Routes = [
  {
    path: '',
    component: BaseHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseHomePageRoutingModule {}
