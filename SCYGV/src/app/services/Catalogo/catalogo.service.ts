import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalogo } from 'src/app/modelo/catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  API:string = "http://152.70.137.115:3000/catalogos";
  constructor(private Http:HttpClient) { }


  listarCatalogos(){
    return this.Http.get(this.API);
  }
  
  catalogoEspecifico(annios_lab:any){
    return this.Http.get(this.API + '/' + annios_lab);
  }

  eliminarCatalogo(annios_lab:any){
     return this.Http.delete(this.API + '/' + annios_lab);
  }

  crearCatalogo(Catalogo:Catalogo){
    return this.Http.post(this.API, Catalogo);
  }

  actualizarCatalogo(annios_lab:any,  Catalogo:Catalogo){
    return this.Http.put(this.API + '/' + annios_lab, Catalogo);
  }
}

export interface InterfaceCatalogo{
  annios_lab?:any;
  dias_vac?:any;
}