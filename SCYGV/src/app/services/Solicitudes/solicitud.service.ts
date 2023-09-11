import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bandeja } from 'src/app/modelo/bandeja';
import { Solicitud } from 'src/app/modelo/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  rutaG = 'http://localhost:3000/solicitudes'
  rutaE = 'http://localhost:3000/estado'
  constructor(private http: HttpClient) {}

  //Obtener Solicitudes
  getSolicitud(){
    return this.http.get(this.rutaG)
  }

  //Crear Solicitud
  createSolicitud(solicitud:Solicitud){
    return this.http.post(this.rutaG, solicitud,{
      observe: 'response'
    })
  }

  //Eliminar Solicitud
  deleteSolicitud(idSoli : number){
    return this.http.delete(this.rutaG + "/" + idSoli)
  }

  //Actualizar Solicitud
  updateSolicitud(idSoli : number, solicitud:Solicitud){
    return this.http.put(this.rutaG + "/" + idSoli, solicitud)
  }

  updateBand(idSoli:number,soli:Bandeja){
    return this.http.put(this.rutaE + "/" + idSoli, soli)
  }
 
  //Obtener Solicitud por ID
  getIdSolicitud(idSoli: number){
    return this.http.get(this.rutaG + "/" + idSoli);
  }
}
