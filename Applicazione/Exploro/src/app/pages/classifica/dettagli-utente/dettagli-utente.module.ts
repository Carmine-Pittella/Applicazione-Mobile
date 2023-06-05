import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DettagliUtentePageRoutingModule } from './dettagli-utente-routing.module';

import { DettagliUtentePage } from './dettagli-utente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DettagliUtentePageRoutingModule
  ],
  declarations: [DettagliUtentePage]
})
export class DettagliUtentePageModule {}
