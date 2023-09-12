import { Component } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-bandeja-empleado',
  templateUrl: './bandeja-empleado.component.html',
  styleUrls: ['./bandeja-empleado.component.css']
})
export class BandejaEmpleadoComponent{
  //Se utiliza para mostrar el solicitud
 LSolicitud !: Solicitud[];
 LSolicitu !: Solicitud[];

 id:number = 0

 constructor(private sService:SolicitudService){}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolicitud()
  this.getSolicitu()
}

//Mostrar solicitud por Id
getSolicitud():any{
this.sService.getIdSoliA(this.id).subscribe(res =>{
  this.LSolicitud = <any>res
  console.log(res)
})
}

getSolicitu():any{
  this.sService.getIdSoliRec(this.id).subscribe(res =>{
    this.LSolicitu = <any>res
    console.log(res)
  })
  }
}
