import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RichiesteApprovazionePageRoutingModule } from './richieste-approvazione-routing.module';

import { RichiesteApprovazionePage } from './richieste-approvazione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RichiesteApprovazionePageRoutingModule
  ],
  declarations: [RichiesteApprovazionePage]
})
export class RichiesteApprovazionePageModule {}
