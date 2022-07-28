import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Modificar } from './modificar.page';

const routes: Routes = [
  {
    path: '',
    component: Modificar
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoqueseaPageRoutingModule {}
