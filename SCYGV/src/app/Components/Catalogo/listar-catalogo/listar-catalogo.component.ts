import { Component } from '@angular/core';
import { CatalogoService, InterfaceCatalogo } from 'src/app/services/Catalogo/catalogo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent {
  //Variable para listar los catalogos
  ListarCatalogos!: InterfaceCatalogo[];

  constructor(private serviceR:CatalogoService, private router: Router){}

  ngOnInit(): void{
    this.listarCatalogos();
  }

  listarCatalogos():any{
    this.serviceR.listarCatalogos().subscribe(response=>{
      this.ListarCatalogos = <any> response;
      console.log(response);
    })
  }

  eliminarCatalogo(id:any){
    this.serviceR.eliminarCatalogo(id).subscribe(response => {
      console.log('Catalogo eliminado');
      this.listarCatalogos();
    }, err=> console.log(err))
  }

  editarRol(annios_lab:any){
    this.router.navigate(['/Editar-Catalogo/' + annios_lab]);
  }
}
