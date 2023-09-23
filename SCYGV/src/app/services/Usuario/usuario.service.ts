import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  rutaG = 'http://localhost:3000/usuario'
  rutaLog = 'http://localhost:3000/login'
  rutaAnti = 'http://localhost:3000/antiguedad'
  constructor(private http: HttpClient) {}
  //Logear
  postLog(usuario:Usuario){
    return this.http.post(this.rutaLog,usuario)
  }

  //Obtener Usuarios
  getUsuario(){
    return this.http.get(this.rutaG);
  }

   //Obtener antiguedad usuarios
   getAntiUsuario(){
    return this.http.get(this.rutaAnti);
  }


  //Crear Usuario
  createUsuario(usuario:Usuario){
    return this.http.post(this.rutaG, usuario,{
      observe: 'response'
    })
  }

  //Eliminar Usuario
  deleteUsuario(idUsuario : number){
    return this.http.delete(this.rutaG + "/" + idUsuario)
  }

  //Actualizar usuario
  updateUsuario(idUsuario : number,usuario:Usuario){
    return this.http.put(this.rutaG + "/" + idUsuario, usuario)
  }
 
  //Obtener Usuario por ID
  getIdUsuario(idUsuario: number){
    return this.http.get(this.rutaG + "/" + idUsuario);
  }

}
