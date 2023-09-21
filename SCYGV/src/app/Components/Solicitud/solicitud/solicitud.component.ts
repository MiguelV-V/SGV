import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
 //Se utiliza para mostrar el solicitud
 LSolicitud !: Solicitud[];
 //Form
 FormSoli: FormGroup

 id:number = 0
 idR:number = 0
 mostrarC: boolean = true;
 mostrarA: boolean = false;

 constructor(private sService:SolicitudService, private fb:FormBuilder){
  //Formulario para trabajar con los solicituds
  this.FormSoli = fb.group({
    id : new FormControl(),
    id_user : new FormControl('',[Validators.required]),
    fecha_i : new FormControl('',[Validators.required]),
    fecha_f : new FormControl('',[Validators.required]),
    motivo : new FormControl('',[Validators.required]),
    estado : new FormControl()
  })
}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolicitudes()
}

getSolicitudes():any{
  this.sService.getIdSoliR(this.id).subscribe(res =>{
    this.LSolicitud = <any>res
    console.log(res)
  })
  }


//Crear Solicitud
createSolicitud(){
  if(this.FormSoli.valid)
  {
    let solicitud = new Solicitud()
    solicitud.id_user = this.FormSoli.get('id_user')?.value
    solicitud.fecha_i = this.FormSoli.get('fecha_i')?.value
    solicitud.fecha_f = this.FormSoli.get('fecha_f')?.value
    solicitud.motivo = this.FormSoli.get('motivo')?.value
    this.sService.createSolicitud(solicitud).subscribe(res =>
      this.getSolicitudes(),
      this.limpiar()
    )}
}

//Eliminar solicitud
deleteSolicitud(idSoli : any){
  this.sService.deleteSolicitud(idSoli).subscribe(res =>{
    console.log(res)
    this.getSolicitudes()
  },error => console.log(error))
}

//Actualizar solicitud
updateSolicitud(idSoli : any){
  if(this.FormSoli.valid)
  {
    let solicitud = new Solicitud()
    solicitud.id = this.FormSoli.get('id')?.value
    solicitud.id_user = this.FormSoli.get('id_user')?.value
    solicitud.fecha_i = this.FormSoli.get('fecha_i')?.value
    solicitud.fecha_f = this.FormSoli.get('fecha_f')?.value
    solicitud.motivo = this.FormSoli.get('motivo')?.value
    solicitud.estado = this.FormSoli.get('estado')?.value
    idSoli = solicitud.id;
    this.sService.updateSolicitud(idSoli,solicitud).subscribe(res =>
      this.getSolicitudes(),
      this.limpiar()
    )}
  }
  
  //Funcion para editar la solicitud
  editar(solicitud:Solicitud){
    this.mostrarC = false;
    this.mostrarA = true;
    this.FormSoli.get("id")?.setValue(solicitud.id);
    this.FormSoli.get('id_user')?.setValue(solicitud.id_user)
    this.FormSoli.get('fecha_i')?.setValue(solicitud.fecha_i)
    this.FormSoli.get('fecha_f')?.setValue(solicitud.fecha_f)
    this.FormSoli.get('motivo')?.setValue(solicitud.motivo)
    this.FormSoli.get('estado')?.setValue(solicitud.estado)
}


//Funcion para limpar el formulario
limpiar():any{this.mostrarC = true;this.mostrarA = false;this.FormSoli.reset()}

}




