import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelo/usuario';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  LUsuario !: Usuario[];

  constructor(private Uservice:usuarioService){}
   ngOnInit():void{
    this.getUser()
  }
  
  getUser():any{
    this.Uservice.getIdUsuario().subscribe(res =>{
      this.LUsuario = <any>res
      console.log(res)})
  }

  
}
