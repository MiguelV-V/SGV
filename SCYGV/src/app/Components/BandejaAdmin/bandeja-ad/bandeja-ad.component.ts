import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Bandeja } from 'src/app/modelo/bandeja';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-bandeja-ad',
  templateUrl: './bandeja-ad.component.html',
  styleUrls: ['./bandeja-ad.component.css']
})
export class BandejaAdComponent {
//Se utiliza para mostrar el solicitud
LSolienrev !: Solicitud[];
LSoliacep !: Solicitud[];
LSolirech !: Solicitud[];
FormSoli:FormGroup

id:any = 0

constructor(private sService:SolicitudService, private fb:FormBuilder){
  this.FormSoli = fb.group({
    id : new FormControl(),
    estado : new FormControl()
  })
}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolienrev()
  this.getSoliacept()
  this.getSolirech()
}

//Obtener Solicitudes en revision
getSolienrev():any{
  this.sService.getSolienrev().subscribe(res =>{
    this.LSolienrev = <any>res
    console.log(res)
  })
}
//Obtener Solicitudes Aceptadas
getSoliacept():any{
  this.sService.getSoliacept().subscribe(res =>{
    this.LSoliacep = <any>res
    console.log(res)
  })
}
//Obtener Solicitudes Rechazadas
getSolirech():any{
  this.sService.getSolirech().subscribe(res =>{
    this.LSolirech = <any>res
    console.log(res)
  })
}
//Actualizar solicitud
updateSolicitud(idsoli:any, soli:Bandeja){
  this.FormSoli.get("id")?.setValue(soli.id);
  if(this.FormSoli.valid)
  {
    let solicitud = new Bandeja()
    solicitud.id = this.FormSoli.get('id')?.value
    if(this.FormSoli.get('estado')?.value == "Aceptar"){
      solicitud.estado = "Aceptada";

    }
    else if(this.FormSoli.get('estado')?.value == "Rechazar"){
      solicitud.estado = "Rechazada";
    }
    idsoli = solicitud.id;
    this.sService.updateBand(idsoli,solicitud).subscribe(res =>
      this.getSolienrev(),
      this.limpiar()
    )}
  }
  //Funcion para limpar el formulario
limpiar():any{this.FormSoli.reset()}

  
}
