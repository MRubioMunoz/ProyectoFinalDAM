import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../model/persona';
import { ServicioFirebase } from '../service/servicio-firebase.service';

@Component({
  selector: 'app-lista-sin-registrar',
  templateUrl: './lista-sin-registrar.page.html',
  styleUrls: ['./lista-sin-registrar.page.scss'],
})
export class ListaSinRegistrarPage {

  personas: Array<Persona>

  constructor( 
    private servicioFirestore: ServicioFirebase,
    private router: Router) { 
      servicioFirestore.getPersonasRegistradas().subscribe(
        (personas) => {
          this.personas = personas.filter((persona) => persona.Nombre == '');
        }
      )
    }
}