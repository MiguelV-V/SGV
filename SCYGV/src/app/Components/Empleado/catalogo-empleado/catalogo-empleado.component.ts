import { Component, ViewChild } from '@angular/core';
import { CatalogoService } from 'src/app/services/Catalogo/catalogo.service';
import { Catalogo } from 'src/app/modelo/catalogo';

@Component({
  selector: 'app-catalogo-empleado',
  templateUrl: './catalogo-empleado.component.html',
  styleUrls: ['./catalogo-empleado.component.css']
})
export class CatalogoEmpleadoComponent {
  //Variable para listar los catalogos
  ListarCatalogos!: Catalogo[];

  Catalogo:Catalogo = {
    annios_lab:'',
    dias_vac:''
  };

  constructor(private serviceR:CatalogoService){}

  ngOnInit(): void{
    this.listarCatalogos();
  }

  //Función para llenar la tabla con los datos
  listarCatalogos():any{
    this.serviceR.listarCatalogos().subscribe(response=>{
      this.ListarCatalogos = <any> response;
      console.log(response);
    })
  }
}
