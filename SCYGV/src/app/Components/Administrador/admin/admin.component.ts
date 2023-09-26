import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")!;
  constructor(private router:Router){}
  
  CerrarSesion():void{
    localStorage.clear();
    this.router.navigateByUrl("/Home");
  }
}
