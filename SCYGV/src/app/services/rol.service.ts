import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Rol } from '../modelo/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  rutaG = 'http://localhost:3000/roles'
  constructor(private http: HttpClient) {}
  //Obtener rol
  getRol(){
    return this.http.get(this.rutaG)
  }

  //Crear Rol
  createRol(rol: Rol){
    return this.http.post(this.rutaG, rol)
  }

  //Eliminar Rol
  deleteRol(idRol : number){
    return this.http.delete(this.rutaG + "/" + idRol)
  }
  //Modificar Rol
  updateRol(idRol : number, Rol : Rol){
    return this.http.put(this.rutaG + "/" + idRol,Rol)
  }

  //Obtener Rol por ID
  getIdRol(idRol: number){
    return this.http.get(this.rutaG + "/" + idRol);
  }
}

