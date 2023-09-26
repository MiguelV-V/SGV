import { Component } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")! + " " +localStorage.getItem("Apellidos");
}
