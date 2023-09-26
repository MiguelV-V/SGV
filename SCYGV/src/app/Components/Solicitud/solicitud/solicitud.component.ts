import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Solicitud } from 'src/app/modelo/solicitud';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';
import swal from'sweetalert2';

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

 DiasD:String = ""
 id:number = 0
 idR:number = 0
 mostrarC: boolean = true;
 mostrarA: boolean = false;

 constructor(private sService:SolicitudService, private fb:FormBuilder){
  //Formulario para trabajar con los solicituds
  this.FormSoli = fb.group({
    id : new FormControl(),
    fecha_i : new FormControl('',[Validators.required]),
    fecha_f : new FormControl('',[Validators.required]),
    motivo : new FormControl('',[Validators.required]),
  })
}

//Iniciar la muestra de solicitudes
ngOnInit():void{
  this.getSolicitudes()
  this.getDiasDispo()
}

getSolicitudes():any{
  this.sService.getIdSoliR().subscribe(res =>{
    this.LSolicitud = <any>res
    console.log(res)})
}

getDiasDispo():any{
  this.sService.getDiasDispo().subscribe(res =>{
    this.DiasD = <any>res
    console.log(res)
  })
}
//Crear Solicitud
createSolicitud(){
  if(this.FormSoli.valid)
  {
    let solicitud = new Solicitud()
    solicitud.fecha_i = this.FormSoli.get('fecha_i')?.value
    solicitud.fecha_f = this.FormSoli.get('fecha_f')?.value
    solicitud.motivo = this.FormSoli.get('motivo')?.value
    this.sService.createSolicitud(solicitud).subscribe(res =>{
    if(res.body == "Falso Año"){
        swal.fire({
          icon: 'info',
          title: 'Aun no cumples 1 año para poder solicitar vacaciones',
          showConfirmButton: true
        })
        this.ngOnInit()
        this.limpiar()
    }
    else if(res.body == "Falso Dias"){
      swal.fire({
        icon: 'info',
        title: 'No dispones de suficientes dias de vacaciones, favor de verificar fechas y dias disponibles',
        showConfirmButton: true
      })
      this.ngOnInit()
      this.limpiar()
    }
    else if(res.body == "Correcto"){
      swal.fire({
        icon: 'success',
        title: 'Se envio correctamente la solicitud',
        showConfirmButton: true
      })
      this.ngOnInit()
    }})}
}

//Eliminar solicitud
deleteSolicitud(idSoli : any){
  this.sService.deleteSolicitud(idSoli).subscribe(res =>{
    console.log(res)
    this.ngOnInit()
  },error => console.log(error))
}

//Actualizar solicitud
updateSolicitud(idSoli : any){
  if(this.FormSoli.valid)
  {
    let solicitud = new Solicitud()
    solicitud.id = this.FormSoli.get('id')?.value
    solicitud.fecha_i = this.FormSoli.get('fecha_i')?.value
    solicitud.fecha_f = this.FormSoli.get('fecha_f')?.value
    solicitud.motivo = this.FormSoli.get('motivo')?.value
    idSoli = solicitud.id;
    this.sService.updateSolicitud(idSoli,solicitud).subscribe(res =>
      this.ngOnInit(),
      this.limpiar()
    )}
  }
  
  //Funcion para editar la solicitud
  editar(solicitud:Solicitud){
    this.mostrarC = false;
    this.mostrarA = true;
    this.FormSoli.get("id")?.setValue(solicitud.id);
    this.FormSoli.get('fecha_i')?.setValue(solicitud.fecha_i)
    this.FormSoli.get('fecha_f')?.setValue(solicitud.fecha_f)
    this.FormSoli.get('motivo')?.setValue(solicitud.motivo)
}


//Funcion para limpar el formulario
limpiar():any{this.mostrarC = true;this.mostrarA = false;this.FormSoli.reset()}

}




