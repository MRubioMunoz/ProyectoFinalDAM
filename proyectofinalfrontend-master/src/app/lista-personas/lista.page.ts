import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HoraModel } from '../model/horaModel';
import { Persona } from '../model/persona';
import { ServicioFirebase } from '../service/servicio-firebase.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss']
})
export class ListaPage {

  personas: Array<Persona>
  horas : Array<HoraModel>
  personasListaCompleta : Array<Persona>
  errorConexion = false;
  isItemAvailable = false;

  constructor(
    private servicioFirestore: ServicioFirebase,
    private router: Router) {
    servicioFirestore.getPersonasRegistradas().subscribe(
      (personas) => {
        this.personas = personas.filter((persona) => persona.Nombre != '')
        this.personasListaCompleta = personas.filter((persona) => persona.Nombre != '')
      },
      (error) => {
        this.errorConexion = true;
      }
    )

    servicioFirestore.getHoras().subscribe(
      (hora) =>{
        this.horas = hora;
      }
    )
  }

  deletePersona(persona: Persona){
    this.servicioFirestore.deletePersona(persona, this.horas);
  }

  getItems(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.personas = this.personas.filter((item) => {
            return (item.Apellidos.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.personas = this.personasListaCompleta;
        this.isItemAvailable = false;
    }
  }
}