import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bandeja, BandejaAdmin } from 'src/app/modelo/bandeja';
import { Solicitud } from 'src/app/modelo/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  rutaG = 'http://localhost:3000/solicitudes'
  rutaE = 'http://localhost:3000/estado'
  rutaR = 'http://localhost:3000/SoliRevision'
  rutaRec = 'http://localhost:3000/SoliRechazada'
  rutaA = 'http://localhost:3000/SoliAceptada'
  constructor(private http: HttpClient) {}

  //Obtener Solicitudes en revision para RH
  getSolienrevRH(){
    return this.http.get('http://localhost:3000/soli_enrev')
  }
  //Obtener Solicitudes en revision para RH
  getSolienrevADMIN(){
    return this.http.get('http://localhost:3000/soli_estado')
  }

  getSoliacept(){
    return this.http.get('http://localhost:3000/soli_acep')
  }
  getSolirech(){
    return this.http.get('http://localhost:3000/soli_recha')
  }
 //Obtener total de solicitudes por revisar para RH
  getSolirevcount(){
    return this.http.get('http://localhost:3000/solirev_count')
  }
 //Obtener total de solicitudes por revisar
 getSoliprocount(){
   return this.http.get('http://localhost:3000/soliproc_count')
 }

   //Obtener Solicitudes
   getDiasDispo(){
    return this.http.get('http://localhost:3000/dias_disponibles' + "/" + localStorage.getItem("Id"))
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

  updateEstado(idSoli:number,soli:Bandeja){
    return this.http.put(this.rutaE + "/" + idSoli + "/" + localStorage.getItem("Nombres"), soli)
  }

  updateObservacion(idSoli:number,soli:BandejaAdmin){
    return this.http.put('http://localhost:3000/observacion' + "/" + idSoli, soli)
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
    return this.http.get("http://localhost:3000/permiso_solicitud" + "/" + localStorage.getItem("Id"))
  }

  
}
