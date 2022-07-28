import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'listaCompleta',
    loadChildren: () => import('./lista-personas/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'listaLlaves',
    loadChildren: () => import('./lista-sin-registrar/lista-sin-registrar.module').then( m => m.ListaSinRegistrarPageModule)
  },
  {
    path: 'modificar/:id',
    loadChildren: () => import('./modificar-persona/modificar.module').then( m => m.LoqueseaPageModule)
  },
  {
    path: 'horas',
    loadChildren: () => import('./lista-horas/lista-horas.module').then( m => m.ListaHorasPageModule)
  },
  {
    path: 'detallePersona/:id',
    loadChildren: () => import('./detalle-persona/detalle-persona.module').then( m => m.DetallePersonaPageModule)
  },
  
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
