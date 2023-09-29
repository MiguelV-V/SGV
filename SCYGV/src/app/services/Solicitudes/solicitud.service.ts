import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bandeja } from 'src/app/modelo/bandeja';
import { Solicitud } from 'src/app/modelo/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  rutaG = 'http://152.70.137.115:3000/solicitudes'
  rutaE = 'http://152.70.137.115:3000/estado'
  rutaR = 'http://152.70.137.115:3000/SoliRevision'
  rutaRec = 'http://152.70.137.115:3000/SoliRechazada'
  rutaA = 'http://152.70.137.115:3000/SoliAceptada'
  constructor(private http: HttpClient) {}

  //Obtener Solicitudes
  getSolienrev(){
    return this.http.get('http://152.70.137.115:3000/soli_enrev')
  }
  getSoliacept(){
    return this.http.get('http://152.70.137.115:3000/soli_acep')
  }
  getSolirech(){
    return this.http.get('http://152.70.137.115:3000/soli_recha')
  }

   //Obtener Solicitudes
   getDiasDispo(){
    return this.http.get('http://152.70.137.115:3000/dias_disponibles' + "/" + localStorage.getItem("Id"))
  }

  //Crear Solicitud
  createSolicitud(solicitud:Solicitud){
    return this.http.post(this.rutaG + "/" + localStorage.getItem("Id"), solicitud,{
      observe: 'response'
    })
  }

  //Eliminar Solicitud
  deleteSolicitud(idSoli : number){
    return this.http.delete(this.rutaG + "/" + idSoli)
  }

  //Actualizar Solicitud
  updateSolicitud(idSoli : number, solicitud:Solicitud){
    return this.http.put(this.rutaG + "/" + idSoli + "/" + localStorage.getItem("Id"), solicitud)
  }

  updateBand(idSoli:number,soli:Bandeja){
    return this.http.put(this.rutaE + "/" + idSoli + "/" + localStorage.getItem("Nombres"), soli)
  }
 
  
  getIdSoliR(){
    return this.http.get(this.rutaR + "/" + localStorage.getItem("Id"));
  }

  getIdSoliRec(){
    return this.http.get(this.rutaRec + "/" + localStorage.getItem("Id"));
  }

  getIdSoliA(){
    return this.http.get(this.rutaA + "/" + localStorage.getItem("Id"));
  }

  getpermiso(){
    return this.http.get("http://152.70.137.115:3000/permiso_solicitud" + "/" + localStorage.getItem("Id"))
  }

  
}
