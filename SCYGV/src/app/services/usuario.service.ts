import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  rutaG = 'http://localhost:3000/usuario'
  constructor(private http: HttpClient) {}
  //Obtener Usuarios
  getUsuario(){
    return this.http.get(this.rutaG)
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
