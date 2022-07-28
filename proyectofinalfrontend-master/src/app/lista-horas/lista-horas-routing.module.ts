import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaHorasPage } from './lista-horas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaHorasPage
  },
  {
    path: ':id',
    component: ListaHorasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaHorasPageRoutingModule {}
