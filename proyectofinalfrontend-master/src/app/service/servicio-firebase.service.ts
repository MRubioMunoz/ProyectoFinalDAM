import { Persona } from '../model/persona';
import { HoraModel } from '../model/horaModel';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioFirebase {

  collection = 'persona'
  collectionHora = 'hora'

  constructor(private firestore: AngularFirestore) { }

  getPersonasRegistradas(): Observable<Persona[]>{
    return this.firestore.collection<Persona>(this.collection).snapshotChanges().pipe(
      map (personas => { 
        return personas.map(
          persona => {
            const data = persona.payload.doc.data();
            const key = persona.payload.doc.id;
            return{id: key, ...data}
          }
        );
      })
    );
  }

  getPersona(id: string){
    return this.firestore.collection(this.collection).doc<Persona>(id).snapshotChanges().pipe(
      map(carta =>{
        const data = carta.payload.data();
        const key = carta.payload.id;
        return{id: key, ...data}
      })
    );
  }

  updatePersona(persona: Persona) {
    console.log(persona)
    return this.firestore.collection<Persona>(this.collection).doc(persona.id)
    .update({
      Nombre: persona.Nombre,
      Apellidos: persona.Apellidos,
      Email: persona.Email,
    });
  }

  deletePersona(persona: Persona, horas:HoraModel[]) {
    this.deleteHorasUnicas(persona.IDLlave,horas);
    return this.firestore.collection<Persona>(this.collection).doc(persona.id).delete();
  }

  getHoras(): Observable<HoraModel[]>{
    return this.firestore.collection<HoraModel>(this.collectionHora).snapshotChanges().pipe(
      map (horas => { 
        return horas.map(
          hora => {
            const data = hora.payload.doc.data();
            const key = hora.payload.doc.id;
            return{id: key, ...data}
          }
        );
      })
    );
  }

  createHistoricoHoras(horas:HoraModel[]) {   
    horas.forEach(hora => {
      var anio: string = "20" + hora.Dia.substr(hora.Dia.length - 2); 
      return this.firestore.collection<HoraModel>(anio).add(hora);
    });
  }

  addHostoricoHorasPersona(anio: string, hora: HoraModel){
    return this.firestore.collection<HoraModel>(anio).add(hora);
  }

  getHistorico(anio: string): Observable<HoraModel[]>{
    return this.firestore.collection<HoraModel>(anio).snapshotChanges().pipe(
      map (horas => { 
        return horas.map(
          hora => {
            const data = hora.payload.doc.data();
            const key = hora.payload.doc.id;
            return{id: key, ...data}
          }
        );
      })
    );
  }

  deleteHora(hora: HoraModel) {
    return this.firestore.collection<HoraModel>(this.collectionHora).doc(hora.id).delete();
  }

  deleteHoras(horas: HoraModel[]){
    this.createHistoricoHoras(horas);
    horas.forEach(element => {
      this.deleteHora(element);
    });
  }

  deleteHorasUnicas(id: string,horas: HoraModel[]){
    horas.forEach(hora =>{
      if(hora.IDLlave == id)
        var anio  = "20" + hora.Dia.substr(hora.Dia.length - 2); 
        this.addHostoricoHorasPersona(anio, hora)
        this.deleteHora(hora)
    })
  }
}

