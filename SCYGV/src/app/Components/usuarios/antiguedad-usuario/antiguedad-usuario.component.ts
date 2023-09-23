import { Component } from '@angular/core';
import { antiguedad } from 'src/app/modelo/antiguedad';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-antiguedad-usuario',
  templateUrl: './antiguedad-usuario.component.html',
  styleUrls: ['./antiguedad-usuario.component.css']
})
export class AntiguedadUsuarioComponent {
  Lantiguedad !: antiguedad[];

  constructor(private UService:usuarioService){}
  //Iniciar la muestra de Usuarios
  ngOnInit():void{
    this.getRol()
  }

   //Mostrar Rol
getRol():any{
  this.UService.getAntiUsuario().subscribe(res =>{
    this.Lantiguedad = <any>res
    console.log(res)
  })
}
}
