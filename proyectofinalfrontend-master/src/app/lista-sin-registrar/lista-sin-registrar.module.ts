import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaSinRegistrarPageRoutingModule } from './lista-sin-registrar-routing.module';

import { ListaSinRegistrarPage } from './lista-sin-registrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaSinRegistrarPageRoutingModule
  ],
  declarations: [ListaSinRegistrarPage]
})
export class ListaSinRegistrarPageModule {}
