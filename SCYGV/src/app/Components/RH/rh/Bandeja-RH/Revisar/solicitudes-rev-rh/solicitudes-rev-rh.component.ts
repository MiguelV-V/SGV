import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Bandeja } from 'src/app/modelo/bandeja';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-solicitudes-rev-rh',
  templateUrl: './solicitudes-rev-rh.component.html',
  styleUrls: ['./solicitudes-rev-rh.component.css']
})
export class SolicitudesRevRHComponent {
  //Se utiliza para mostrar el solicitud
  LSolienrev !: Solicitud[];
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
  }
  
  //Obtener Solicitudes en revision
  getSolienrev():any{
    this.sService.getSolienrevRH().subscribe(res =>{
      this.LSolienrev = <any>res
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
      this.sService.updateEstado(idsoli,solicitud).subscribe(res =>
        this.getSolienrev(),
        this.limpiar()
      )}
    }
    //Funcion para limpar el formulario
  limpiar():any{this.FormSoli.reset()}
}
