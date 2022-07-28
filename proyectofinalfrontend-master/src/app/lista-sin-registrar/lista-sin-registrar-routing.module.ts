import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSinRegistrarPage } from './lista-sin-registrar.page';

const routes: Routes = [
  {
    path: '',
    component: ListaSinRegistrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaSinRegistrarPageRoutingModule {}
