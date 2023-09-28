import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: ['./rh.component.css']
})
export class RHComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")!;
  constructor(private router:Router){}
  
  CerrarSesion():void{
    localStorage.clear();
    this.router.navigateByUrl("/Home");
  }
}
