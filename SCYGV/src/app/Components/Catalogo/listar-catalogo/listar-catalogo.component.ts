import { Component, ViewChild } from '@angular/core';
import { CatalogoService } from 'src/app/services/Catalogo/catalogo.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Catalogo } from 'src/app/modelo/catalogo';
import Swal from'sweetalert2';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent {
  //Variable para listar los catalogos
  ListarCatalogos!: Catalogo[];

  FormCat: FormGroup
  
  annios_lab:any = ''

  Catalogo:Catalogo = {
    annios_lab:'',
    dias_vac:''
  };

  constructor(private serviceR:CatalogoService, private router: Router, private fb:FormBuilder){
    this.FormCat = fb.group({
      annios_lab : new FormControl(''),
      dias_vac : new FormControl(''),
      cat: this.Catalogo.annios_lab,
      vac: this.Catalogo.dias_vac
    })
  }

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

  //Función para eliminar un catalogo
  eliminarCatalogo(id:any){
    Swal
    .fire({
        text: "¿Está seguro que desea eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            this.serviceR.eliminarCatalogo(id).subscribe(response => {
            console.log('Catalogo eliminado');
            this.listarCatalogos();
          }, err=> console.log(err))
        }
    });
  }

  //Función para agregar un nuevo catálogo
  agregarCatalogos(){
    this.serviceR.crearCatalogo(this.Catalogo).subscribe(response => {
      console.log('Catalogo agregado');
      this.listarCatalogos();
    }, err=> console.log(err))
  }


  //Función para llenar automáticamente los inputs
  editar(catalogo:Catalogo){
    this.FormCat.get('cat')?.setValue(catalogo.annios_lab)
    this.FormCat.get('vac')?.setValue(catalogo.dias_vac)
    this.annios_lab = catalogo.annios_lab

  }

  //Función para editar los campos
  updateCatalogo(){
    let catalogo = new Catalogo()
    if(this.FormCat.valid)
    {
      catalogo.annios_lab = this.FormCat.get('cat')?.value
      catalogo.dias_vac = this.FormCat.get('vac')?.value
      //idCat = catalogo.annios_lab;
      this.serviceR.actualizarCatalogo(this.annios_lab,catalogo).subscribe(res =>
        this.listarCatalogos(),
        this.limpiar
      )}
    }

    //Función para editar los datos del formulario
    limpiar():any{this.FormCat.reset()}
}