import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HoraModel } from '../model/horaModel';
import { ServicioFirebase } from '../service/servicio-firebase.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-lista-horas',
  templateUrl: './lista-horas.page.html',
  styleUrls: ['./lista-horas.page.scss'],
})
export class ListaHorasPage {

  horas: Array<HoraModel>
  horasListaCompleta : Array<HoraModel>
  errorConexion = false;
  isItemAvailable = false;

  constructor( private servicioFirestore: ServicioFirebase,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController
    ) {
      const pathId = activatedRoute.snapshot.paramMap.get('id');
      servicioFirestore.getHoras().subscribe(
        (horas) =>{
          if (pathId != null) {
            this.horas = horas;
            this.horasListaCompleta = horas;
            this.horas = this.horas.filter((hora) => hora.IDLlave == pathId)
          } else {
          this.horas = horas;
          this.horasListaCompleta = horas;
          }
        }
      )
     }
     
     async presentActionSheet(){
       const actionSheet = this.actionSheetCtrl.create({
         header : "¿Borrar todos los datos? Se guardarán en el historico del año",
         buttons: [
           {
             text : 'Borrar',
             role : 'destructive',
             icon: 'trash',
             cssClass: '.my-custom-class',
             handler: () => this.deleteAllHoras()
           },
           {
            text: 'Cancelar',
            icon: 'close',
            role: 'cancel',
           }
         ]
       });
       (await actionSheet).present();
     }

     

     deleteHora(hora: HoraModel) {
      this.servicioFirestore.deleteHora(hora);
    }

    deleteAllHoras(){
      this.servicioFirestore.deleteHoras(this.horas);
    }


     getItems(ev: any) {

      const val = ev.target.value;
  
      if (val && val.trim() !== '') {
          this.isItemAvailable = true;
          this.horas = this.horas.filter((item) => {
              return (item.Email.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      } else {
          this.horas = this.horasListaCompleta;
          this.isItemAvailable = false;
      }
    }
}