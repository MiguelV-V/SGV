import { Component } from '@angular/core';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-saceptada-emp',
  templateUrl: './saceptada-emp.component.html',
  styleUrls: ['./saceptada-emp.component.css']
})
export class SAceptadaEmpComponent {
   //Se utiliza para mostrar el solicitud
 LSoliAcep !: Solicitud[];

 constructor(private sService:SolicitudService){}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSoliAcep()

}


getSoliAcep():any{
this.sService.getIdSoliA().subscribe(res =>{
  this.LSoliAcep = <any>res
  console.log(res)
})
}


}
