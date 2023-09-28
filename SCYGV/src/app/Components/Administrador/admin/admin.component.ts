import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")! + " " + localStorage.getItem("Apellidos");
  constructor(private router:Router){}
  
  CerrarSesion():any{
    swal.fire({
      text: "¿Está seguro que desea eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
  })
  .then(resultado => {
    if (resultado.value) {
      localStorage.clear();
      this.router.navigateByUrl("/Home");
    }})
  }
}
