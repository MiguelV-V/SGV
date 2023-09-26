import { Component } from '@angular/core';

@Component({
  selector: 'app-home-emp',
  templateUrl: './home-emp.component.html',
  styleUrls: ['./home-emp.component.css']
})
export class HomeEmpComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")! + " " +localStorage.getItem("Apellidos");
}
