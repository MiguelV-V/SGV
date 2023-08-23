import { Component } from '@angular/core';
import { CatalogoService, InterfaceCatalogo } from 'src/app/services/Catalogo/catalogo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-catalogo',
  templateUrl: './agregar-catalogo.component.html',
  styleUrls: ['./agregar-catalogo.component.css']
})
export class AgregarCatalogoComponent {
  Catalogo:InterfaceCatalogo = {
    annios_lab:'',
    dias_vac:''
  };

  constructor(private serviceR:CatalogoService, private router: Router){}

  agregarCatalogos(){
    this.serviceR.crearCatalogo(this.Catalogo).subscribe();
    this.router.navigateByUrl('/Catalogos');
  }
}
