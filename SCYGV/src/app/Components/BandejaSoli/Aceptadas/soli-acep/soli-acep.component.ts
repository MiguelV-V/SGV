import { Component } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-soli-acep',
  templateUrl: './soli-acep.component.html',
  styleUrls: ['./soli-acep.component.css']
})
export class SoliAcepComponent {
  LSoliacep !: Solicitud[];
  constructor(private sService:SolicitudService){
  }

  //Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSoliacept()
}


//Obtener Solicitudes Aceptadas
getSoliacept():any{
  this.sService.getSoliacept().subscribe(res =>{
    this.LSoliacep = <any>res
    console.log(res)
  })
}
}
