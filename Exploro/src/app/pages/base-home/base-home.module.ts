import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaseHomePageRoutingModule } from './base-home-routing.module';

import { BaseHomePage } from './base-home.page';
import { MapComponent } from '../../component/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseHomePageRoutingModule
  ],
  declarations: [BaseHomePage,] // do dovuto rimuovere la dichiarazione di MapComponent perché mi dava un errore.
  // in pratica non può essere dichiarato in sia in questa pagina che nella Homepage che ho creato
})
export class BaseHomePageModule { }
