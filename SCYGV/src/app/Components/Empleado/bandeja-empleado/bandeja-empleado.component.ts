import { Component } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-bandeja-empleado',
  templateUrl: './bandeja-empleado.component.html',
  styleUrls: ['./bandeja-empleado.component.css']
})
export class BandejaEmpleadoComponent {
  //Se utiliza para mostrar el solicitud
 LSolicitud !: Solicitud[];

 id:number = 0

 mostrarC: boolean = true;
 mostrarA: boolean = false;

 constructor(private sService:SolicitudService){}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolicitud()
}


//Mostrar Solicitudes
getSolicitud():any{
  this.mostrarC = true;
  this.sService.getSolicitud().subscribe(res =>{
    this.LSolicitud = <any>res
    console.log(res)})
}

//Mostrar solicitud por Id
getRolId(idSoli: number):any{
this.sService.getIdSolicitud(idSoli).subscribe(res =>{
  this.LSolicitud = <any>res
  console.log(res)
})
}
}
