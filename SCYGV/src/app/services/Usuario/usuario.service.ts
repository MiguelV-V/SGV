import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario, userRes } from 'src/app/modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  rutaG = 'http://localhost:3000/usuario'
  rutaLog = 'http://localhost:3000/login'
  rutaAnti = 'http://localhost:3000/antiguedad'
  constructor(private http: HttpClient) {}
  //Logear
  postLog(correo:String, contrasena:String):Observable<userRes> {
    return this.http.post<userRes>(this.rutaLog,{correo,contrasena});
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
  getIdUsuario(){
    return this.http.get(this.rutaG + "/" + localStorage.getItem("Id"));
  }
}
