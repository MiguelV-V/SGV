import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario, userRes } from 'src/app/modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  rutaG = 'http://152.70.137.115:3000/usuario'
  rutaLog = 'http://152.70.137.115:3000/login'
  rutaAnti = 'http://152.70.137.115:3000/antiguedad'
  private uploadUrl = 'http://152.70.137.115:3000/upload';
  constructor(private http: HttpClient) {}
  //Logear
  postLog(correo:String, contrasena:String):Observable<userRes> {
    return this.http.post<userRes>(this.rutaLog,{correo,contrasena});
  }

  loginrol(){
    return this.getlocalrol() != null;
  }

  getlocalrol(){
    return localStorage.getItem("Rol");
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

  uploadImage(imageFile: File, userId: string, imageName: string) {
    const formData: FormData = new FormData();
    formData.append('uploaded_file', imageFile, imageName);
  
    // Puedes agregar el ID como un parámetro en el FormData si es necesario
    formData.append('id', userId);
  
    return this.http.post(this.uploadUrl, formData);
  }

  rutaImagen(id: string, imageName: string, requestBody: any) {
    const url = `${this.uploadUrl}/${id}/${imageName}`;

    return this.http.put(url, requestBody);
  }
}
