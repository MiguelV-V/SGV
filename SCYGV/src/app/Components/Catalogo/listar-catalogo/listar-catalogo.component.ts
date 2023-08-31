import { Component, ViewChild } from '@angular/core';
import { CatalogoService } from 'src/app/services/Catalogo/catalogo.service';
import { Router } from '@angular/router';
import { NgForOfContext } from '@angular/common';
import { FormGroup, NgForm } from '@angular/forms';
import { Catalogo } from 'src/app/modelo/catalogo';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent {
  //Variable para listar los catalogos
  ListarCatalogos!: Catalogo[];

  Catalogo:Catalogo = {
    annios_lab:'',
    dias_vac:''
  };

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

  agregarCatalogos(){
    this.serviceR.crearCatalogo(this.Catalogo).subscribe(response => {
      console.log('Catalogo agregado');
      this.listarCatalogos();
    }, err=> console.log(err))
  }

  editarCatalogo(annios_lab:any){
    this.router.navigate(['/Editar-Catalogo/' + annios_lab]);
  }

  actualizarCatalogo(){
    this.serviceR.actualizarCatalogo(this.Catalogo.annios_lab, this.Catalogo).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
  } 
}