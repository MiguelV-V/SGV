import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Usuario, userRes } from 'src/app/modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  userId : string = "";
  rutaG = 'http://localhost:3000/usuario'
  rutaLog = 'http://localhost:3000/login'
  rutaAnti = 'http://localhost:3000/antiguedad'
  private uploadUrl = 'http://localhost:3000/upload';
  rutapostEmpleados = 'http://localhost:3000/empleados';
  rutagetEmpleados = 'http://localhost:3000/ListaEmpleados';
  constructor(private http: HttpClient) {}
  //Logear
  postLog(correo:String, contrasena:String):Observable<userRes> {
    return this.http.post<userRes>(this.rutaLog,{correo,contrasena});
  }

  postEmpleadosCreate(usuario:Usuario){
    return this.http.post<Usuario>(this.rutapostEmpleados,usuario);
  }
  getEmpleados(){
    return this.http.get(this.rutagetEmpleados);
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

 
  uploadImage(imageFile: File, imageName: string) {
    const formData: FormData = new FormData();
    formData.append('uploaded_file', imageFile, imageName);
    this.userId = localStorage.getItem("Id")!;
    // Puedes agregar el ID como un parámetro en el FormData si es necesario
    formData.append('id', this.userId);
  
    return this.http.post(this.uploadUrl, formData);
  }

  rutaImagen(imageName: string, requestBody: any) {
    const url = `${this.uploadUrl}/${localStorage.getItem("Id")}/${imageName}`;

    return this.http.put(url, requestBody);
  }
}
