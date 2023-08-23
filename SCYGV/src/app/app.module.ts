import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';

import { BodyComponent } from './Components/body/body.component';
import { PagUsuComponent } from './Components/usuarios/pag-usu/pag-usu.component';
import { Routes, RouterModule } from '@angular/router';
import { AgregarCatalogoComponent } from './Components/Catalogo/agregar-catalogo/agregar-catalogo.component';
import { EditarCatalogoComponent } from './Components/Catalogo/editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './Components/Catalogo/listar-catalogo/listar-catalogo.component';


const appRoute : Routes = [ 
  {path: 'Roles', component: BodyComponent },
  {path: 'Usuarios', component: PagUsuComponent},
  {path: 'Catalogos', component: ListarCatalogoComponent},
  {path: 'Agregar-Catalogo', component: AgregarCatalogoComponent},
  {path: 'Editar-Catalogo/:annios_lab', component: EditarCatalogoComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    PagUsuComponent,
    AgregarCatalogoComponent,
    EditarCatalogoComponent,
    ListarCatalogoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
