import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmiciPageRoutingModule } from './amici-routing.module';

import { AmiciPage } from './amici.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmiciPageRoutingModule
  ],
  declarations: [AmiciPage]
})
export class AmiciPageModule {}
