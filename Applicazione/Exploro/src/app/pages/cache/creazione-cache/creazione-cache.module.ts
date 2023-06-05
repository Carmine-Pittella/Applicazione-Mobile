import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreazioneCachePageRoutingModule } from './creazione-cache-routing.module';

import { CreazioneCachePage } from './creazione-cache.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreazioneCachePageRoutingModule
  ],
  declarations: [CreazioneCachePage]
})
export class CreazioneCachePageModule {}
