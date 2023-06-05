import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtentiRegistratiPageRoutingModule } from './utenti-registrati-routing.module';

import { UtentiRegistratiPage } from './utenti-registrati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtentiRegistratiPageRoutingModule
  ],
  declarations: [UtentiRegistratiPage]
})
export class UtentiRegistratiPageModule { }
