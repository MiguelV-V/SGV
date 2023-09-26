import { Component } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-srechazada-emp',
  templateUrl: './srechazada-emp.component.html',
  styleUrls: ['./srechazada-emp.component.css']
})
export class SRechazadaEmpComponent {
 //Se utiliza para mostrar el solicitud

 LSoliRech !: Solicitud[];


 constructor(private sService:SolicitudService){}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSoliRech()
}

getSoliRech():any{
  this.sService.getIdSoliRec().subscribe(res =>{
    this.LSoliRech = <any>res
    console.log(res)
  })
  }
}
