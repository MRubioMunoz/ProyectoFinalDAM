import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioFirebase } from "../service/servicio-firebase.service";
import { Persona } from "../model/persona"


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class Modificar{

  id: string;
  persona: Persona;

  personaForm = new FormGroup({
    Nombre: new FormControl('',[Validators.minLength(2), Validators.required]),
    Apellidos: new FormControl('', [Validators.minLength(2), Validators.required]),
    Email: new FormControl('',[Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/), Validators.required] )
  })

  constructor(
    private router: Router,
    private servicio: ServicioFirebase,
    private activatedRoute: ActivatedRoute
  ) {
        
    const pathId = activatedRoute.snapshot.paramMap.get('id');
    this.id = pathId
    this.servicio.getPersona(this.id).subscribe(
      (persona) =>{
        this.persona = persona;
        this.personaForm.get('Nombre').setValue(this.persona.Nombre);
        this.personaForm.get('Apellidos').setValue(this.persona.Apellidos);
        this.personaForm.get('Email').setValue(this.persona.Email);
      }
    )
  }

   actualizarPersona(){
    
    if (this.personaForm.valid) {
      this.persona.Nombre = this.personaForm.get('Nombre').value;
      this.persona.Apellidos = this.personaForm.get('Apellidos').value;
      this.persona.Email = this.personaForm.get('Email').value;
      this.servicio.updatePersona(this.persona).then(
        () => {
          this.router.navigate(['/listaCompleta']);
        }
      )
    }
    
   }
}