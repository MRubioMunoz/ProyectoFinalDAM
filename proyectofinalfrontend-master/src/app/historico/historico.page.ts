import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HoraModel } from '../model/horaModel';
import { ServicioFirebase } from '../service/servicio-firebase.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage{

  horas: Array<HoraModel>
  horasListaCompleta : Array<HoraModel>
  isItemAvailable = false;
  inputValue: string = "";

  constructor( private servicioFirestore: ServicioFirebase,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.horas = new Array<HoraModel>();
     }

  buscarAnio(){
    this.servicioFirestore.getHistorico(this.inputValue).subscribe(
      (horas) =>{
        this.horas = horas;
      }
    );
  }
}
