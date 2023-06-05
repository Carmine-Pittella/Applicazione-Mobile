import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedaUtentePageRoutingModule } from './scheda-utente-routing.module';

import { SchedaUtentePage } from './scheda-utente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedaUtentePageRoutingModule
  ],
  declarations: [SchedaUtentePage]
})
export class SchedaUtentePageModule {}
