import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtentiRegistratiPageRoutingModule } from './utenti-registrati-routing.module';

import { UtentiRegistratiPage } from './utenti-registrati.page';
import { SchedautenteComponent } from 'src/app/component/schedautente/schedautente.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtentiRegistratiPageRoutingModule
  ],
  declarations: [UtentiRegistratiPage, SchedautenteComponent]
})
export class UtentiRegistratiPageModule { }
