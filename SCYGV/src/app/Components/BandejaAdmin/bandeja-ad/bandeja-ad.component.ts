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
LSolicitud !: Solicitud[];
solic : Solicitud = {
}

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
  this.getSolicitud()
}


//Mostrar Solicitudes
getSolicitud():any{
  this.sService.getSolicitud().subscribe(res =>{
    this.LSolicitud = <any>res
    console.log(res)})
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
      this.getSolicitud(),
      this.limpiar()
    )}
  }
  //Funcion para limpar el formulario
limpiar():any{this.FormSoli.reset()}

  
}
