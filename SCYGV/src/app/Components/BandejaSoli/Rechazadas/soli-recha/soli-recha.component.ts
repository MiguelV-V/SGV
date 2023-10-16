import { Component } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-soli-recha',
  templateUrl: './soli-recha.component.html',
  styleUrls: ['./soli-recha.component.css']
})
export class SoliRechaComponent {
  LSolirech !: Solicitud[];

  constructor(private sService:SolicitudService){
  }

  //Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolirech()
}


//Obtener Solicitudes Rechazadas
getSolirech():any{
  this.sService.getSolirech().subscribe(res =>{
    this.LSolirech = <any>res
    console.log(res)
  })
}
}
