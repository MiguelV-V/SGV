import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';

import { BodyComponent } from './Components/Rol/body.component';
import { PagUsuComponent } from './Components/usuarios/pag-usu/pag-usu.component';
import { Routes, RouterModule } from '@angular/router';
import { AgregarCatalogoComponent } from './Components/Catalogo/agregar-catalogo/agregar-catalogo.component';
import { EditarCatalogoComponent } from './Components/Catalogo/editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './Components/Catalogo/listar-catalogo/listar-catalogo.component';
import { SolicitudComponent } from './Components/Solicitud/solicitud/solicitud.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { AdminComponent } from './Components/Administrador/admin/admin.component';
import { EmpleadoComponent } from './Components/Empleado/empleado/empleado.component';
import { RHComponent } from './Components/RH/rh/rh.component';


const appRoute : Routes = [ 
  {path: '', redirectTo:'/Home', pathMatch:'full'},
  {path: 'Roles', component: BodyComponent },
  {path: 'Usuarios', component: PagUsuComponent},
  {path: 'Catalogos', component: ListarCatalogoComponent},
  {path: 'Agregar-Catalogo', component: AgregarCatalogoComponent},
  {path: 'Editar-Catalogo/:annios_lab', component: EditarCatalogoComponent},
  {path: 'Home', component: HomeComponent},
  { path: 'Administrador', component: AdminComponent, children: [
    { path: 'Solicitud', component: SolicitudComponent },
    { path: 'Empleado', component: EmpleadoComponent },
    { path: 'Usuario', component: PagUsuComponent},
    { path: 'Catalogos', component: PagUsuComponent},
    // Otras rutas secundarias
  ]},
  {path: 'Empleado', component: EmpleadoComponent},
  { path: 'Solicitud', component: SolicitudComponent },
  {path: 'RH', component: RHComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    PagUsuComponent,
    AgregarCatalogoComponent,
    EditarCatalogoComponent,
    ListarCatalogoComponent,
    SolicitudComponent,
    HomeComponent,
    AdminComponent,
    EmpleadoComponent,
    RHComponent
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
