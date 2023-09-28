import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';
import swal from'sweetalert2';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
NombreUsuario : any = localStorage.getItem("Nombres")!;

constructor(private router:Router, private service:SolicitudService){}

CerrarSesion():void{
  localStorage.clear();
  this.router.navigateByUrl("/Home");
}

Permiso(){
this.service.getpermiso().subscribe(res =>{
  if(res != true){
    swal.fire({
      icon: 'info',
      title: 'Aun no cumples 1 año para poder solicitar vacaciones',
      showConfirmButton: true
    })
  }
  else{
    this.router.navigateByUrl("Empleado/Solicitud")
  }
})
}

}
