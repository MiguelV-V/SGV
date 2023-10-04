import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})
export class RHComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")! + " " + localStorage.getItem("Apellidos");
  constructor(private router:Router){}
  
  CerrarSesion():any{
    swal.fire({
      text: "¿Está seguro que desea cerrar sesión?",
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
