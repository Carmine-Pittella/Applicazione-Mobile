import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DettagliCachePageRoutingModule } from './dettagli-cache-routing.module';

import { DettagliCachePage } from './dettagli-cache.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DettagliCachePageRoutingModule
  ],
  declarations: [DettagliCachePage]
})
export class DettagliCachePageModule {}
