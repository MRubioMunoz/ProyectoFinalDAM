import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../model/persona';
import { ServicioFirebase } from '../service/servicio-firebase.service';

@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.page.html',
  styleUrls: ['./detalle-persona.page.scss'],
})
export class DetallePersonaPage {

  persona: Persona
  id: string;


  constructor(
    private route: ActivatedRoute,
    private servicioFirebase: ServicioFirebase,
    private router: Router
  ) {
    const routeId: string = route.snapshot.paramMap.get('id');
    this.servicioFirebase.getPersona(routeId).subscribe(
      (persona) => {
        this.persona = persona;
      }
    )
   }
}
