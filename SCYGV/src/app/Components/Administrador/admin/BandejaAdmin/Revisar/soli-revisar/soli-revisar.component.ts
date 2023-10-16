import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BandejaAdmin } from 'src/app/modelo/bandeja';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-soli-revisar',
  templateUrl: './soli-revisar.component.html',
  styleUrls: ['./soli-revisar.component.css']
})
export class SoliRevisarComponent {
//Se utiliza para mostrar el solicitud
LSolienrev !: Solicitud[];
FormSoli:FormGroup

id:any = 0
constructor(private sService:SolicitudService, private fb:FormBuilder){
  this.FormSoli = fb.group({
    id : new FormControl(),
    observaciones : new FormControl(),
    comentarios : new FormControl()
  })
}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolienrev()
}

//Obtener Solicitudes en revision
getSolienrev():any{
  this.sService.getSolienrevADMIN().subscribe(res =>{
    this.LSolienrev = <any>res
    console.log(res)
  })
}

//Actualizar solicitud
updateSolicitud(idsoli:any, soli:BandejaAdmin){
  this.FormSoli.get("id")?.setValue(soli.id);
  if(this.FormSoli.valid)
  {
    let solicitud = new BandejaAdmin()
    solicitud.id = this.FormSoli.get('id')?.value
    if(this.FormSoli.get('observaciones')?.value == "Autorizar"){
      solicitud.observaciones = "Autorizada";

    }
    else if(this.FormSoli.get('observaciones')?.value == "No Autorizar"){
      solicitud.observaciones = "No Autorizada";
    }
    idsoli = solicitud.id;
    solicitud.comentario = this.FormSoli.get('comentarios')?.value
    this.sService.updateObservacion(idsoli,solicitud).subscribe(res =>
      this.getSolienrev(),
      this.limpiar()
    )}
  }
  //Funcion para limpar el formulario
limpiar():any{this.FormSoli.reset()}
}
