import { Component } from '@angular/core';
import { CatalogoService, InterfaceCatalogo } from 'src/app/services/Catalogo/catalogo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.component.html',
  styleUrls: ['./editar-catalogo.component.css']
})
export class EditarCatalogoComponent {

  Catalogo:InterfaceCatalogo = {
    annios_lab:'',
    dias_vac:''
  };

  constructor(private serviceR:CatalogoService, private router: Router, private activatedRouter:ActivatedRoute){}

  id_entrada = <any>this.activatedRouter.snapshot.params['annios_lab'];
  ngOnInit(): void{
    
    const id = this.id_entrada;
    //Obtener el rol por el id de entrada
    if(id){
      this.serviceR.catalogoEspecifico(id).subscribe(
        response => {
          this.Catalogo = response;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  actualizarCatalogo(){
    this.serviceR.actualizarCatalogo(this.id_entrada, this.Catalogo).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
    this.router.navigate(['/Catalogos']);
  } 
}
