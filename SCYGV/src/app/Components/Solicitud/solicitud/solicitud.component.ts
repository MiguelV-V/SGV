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
 //Iniciar el boton desactivado
 isClicked: boolean = true;

 constructor(private sService:SolicitudService, private fb:FormBuilder){
  //Formulario para trabajar con los solicituds
  this.FormSoli = fb.group({
    id_user : new FormControl('',[Validators.required]),
    id_rh : new FormControl('',[Validators.required]), 
    fecha : new FormControl('',[Validators.required]),
    motivo : new FormControl('',[Validators.required]),
    dias : new FormControl('',[Validators.required]),
    estado : new FormControl('',[Validators.required])
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

//Crear Solicitud
createSolicitud(){
  if(this.FormSoli.valid)
  {
    let solicitud = new Solicitud()
    solicitud.id_user = this.FormSoli.get('id_user')?.value
    solicitud.id_rh = this.FormSoli.get('id_rh')?.value
    solicitud.fecha = this.FormSoli.get('fecha')?.value
    solicitud.motivo = this.FormSoli.get('motivo')?.value
    solicitud.dias = this.FormSoli.get('dias')?.value
    solicitud.estado = this.FormSoli.get('estado')?.value
    this.sService.createSolicitud(solicitud).subscribe(res =>
      this.getSolicitud(),
      this.limpiar()
    )}
}

//Eliminar solicitud
deleteSolicitud(idSoli : any){
  this.sService.deleteSolicitud(idSoli).subscribe(res =>{
    console.log(res)
    this.getSolicitud()
  },error => console.log(error))
}

//Actualizar solicitud
updateSolicitud(idSoli : any){
  if(this.FormSoli.valid)
  {
    let solicitud = new Solicitud()
    solicitud.id_user = this.FormSoli.get('id_user')?.value
    solicitud.id_rh = this.FormSoli.get('id_rh')?.value
    solicitud.fecha = this.FormSoli.get('fecha')?.value
    solicitud.motivo = this.FormSoli.get('motivo')?.value
    solicitud.dias = this.FormSoli.get('dias')?.value
    solicitud.estado = this.FormSoli.get('estado')?.value
    this.sService.updateSolicitud(idSoli,solicitud).subscribe(res =>
      this.getSolicitud(),
      this.limpiar(), 
      this.Desactivar()
    )}
  }
  
  //Funcion para editar la solicitud
  editar(solicitud:Solicitud){
    this.FormSoli.get('id_user')?.setValue(solicitud.id_user)
    this.FormSoli.get('id_rh')?.setValue(solicitud.id_rh)
    this.FormSoli.get('fecha')?.setValue(solicitud.fecha)
    this.FormSoli.get('motivo')?.setValue(solicitud.motivo)
    this.FormSoli.get('dias')?.setValue(solicitud.dias)
    this.FormSoli.get('estado')?.setValue(solicitud.estado)
    this.Activar()
}

//Mostrar solicitud por Id
getRolId(idSoli: number):any{
this.sService.getIdSolicitud(idSoli).subscribe(res =>{
  this.LSolicitud = <any>res
  console.log(res)
})
}
//Funcion para limpar el formulario
limpiar():any{this.FormSoli.reset()}

//Funcion para activar boton Actualizar
Activar():any{this.isClicked = false}

//Funcion para desactivar boton Actualizar
Desactivar():any{this.isClicked = true}
}



