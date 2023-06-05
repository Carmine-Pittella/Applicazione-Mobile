import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AggiungiAdminPageRoutingModule } from './aggiungi-admin-routing.module';

import { AggiungiAdminPage } from './aggiungi-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggiungiAdminPageRoutingModule
  ],
  declarations: [AggiungiAdminPage]
})
export class AggiungiAdminPageModule {}
