import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCachePageRoutingModule } from './lista-cache-routing.module';

import { ListaCachePage } from './lista-cache.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCachePageRoutingModule
  ],
  declarations: [ListaCachePage]
})
export class ListaCachePageModule {}
