import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
NombreUsuario : any = localStorage.getItem("Nombres")!;

constructor(private router:Router){}

CerrarSesion():void{
  localStorage.clear();
  this.router.navigateByUrl("/Home");
}

}
