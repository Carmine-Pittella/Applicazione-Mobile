import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaDatiPageRoutingModule } from './modifica-dati-routing.module';

import { ModificaDatiPage } from './modifica-dati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaDatiPageRoutingModule
  ],
  declarations: [ModificaDatiPage]
})
export class ModificaDatiPageModule {}
