import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';

import { BodyComponent } from './Components/Rol/body.component';
import { PagUsuComponent } from './Components/usuarios/pag-usu/pag-usu.component';
import { Routes, RouterModule } from '@angular/router';
import { ListarCatalogoComponent } from './Components/Catalogo/listar-catalogo/listar-catalogo.component';
import { SolicitudComponent } from './Components/Solicitud/solicitud/solicitud.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { AdminComponent } from './Components/Administrador/admin/admin.component';
import { EmpleadoComponent } from './Components/Empleado/empleado/empleado.component';
import { RHComponent } from './Components/RH/rh/rh.component';
import { PerfilComponent } from './Components/Perfil/perfil/perfil.component';
import { BandejaAdComponent } from './Components/BandejaAdmin/bandeja-ad/bandeja-ad.component';
import { CatalogoEmpleadoComponent } from './Components/Empleado/catalogo-empleado/catalogo-empleado.component';
import { BandejaEmpleadoComponent } from './Components/Empleado/bandeja-empleado/bandeja-empleado.component';
import { HomeRHComponent } from './Components/RH/rh/HomeRH/home-rh/home-rh.component';
import { HomeAdminComponent } from './Components/Administrador/admin/HomeAdmin/home-admin/home-admin.component';
import { HomeEmpComponent } from './Components/Empleado/HomeEmp/home-emp/home-emp.component';
import { SoliAcepComponent } from './Components/BandejaAdmin/Aceptadas/soli-acep/soli-acep.component';
import { SoliRechaComponent } from './Components/BandejaAdmin/Rechazadas/soli-recha/soli-recha.component';
import { SoliRevisarComponent } from './Components/BandejaAdmin/Revisar/soli-revisar/soli-revisar.component';


const appRoute : Routes = [ 
  {path: '', redirectTo:'/Home', pathMatch:'full'},
  {path: 'Home', component: HomeComponent},
  { path: 'Administrador', component: AdminComponent, children: [
    { path: 'Solicitud', component: SolicitudComponent },
    { path: 'Usuario', component: PagUsuComponent},
    { path: 'Catalogos', component: ListarCatalogoComponent},
    { path: 'Perfil', component: PerfilComponent},
    { path: 'Bandeja', component: BandejaAdComponent, children: [
      { path: 'Revisar', component: SoliRevisarComponent},
      { path: 'Aceptadas', component: SoliAcepComponent},
      { path: 'Rechazadas', component: SoliRechaComponent}

    ]},
    { path: 'HomeAdmin', component: HomeAdminComponent}
    // Otras rutas secundarias
  ]},
  {path: 'Empleado', component: EmpleadoComponent, children: [
    { path: 'Solicitud', component: SolicitudComponent },
    { path: 'Catalogo-Empleado', component: CatalogoEmpleadoComponent },
    { path: 'Bandeja-Empleado', component: BandejaEmpleadoComponent },
    { path: 'Perfil', component: PerfilComponent},
    { path: 'HomeEmpleado', component: HomeEmpComponent}
    
  ]},
  {path: 'RH', component: RHComponent, children:[
    { path: 'Solicitud', component: SolicitudComponent },
    { path: 'Catalogos', component: ListarCatalogoComponent },
    { path: 'Bandeja', component: BandejaAdComponent },
    { path: 'Perfil', component: PerfilComponent},
    { path: 'HomeRH', component: HomeRHComponent}
  ]}
]


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    PagUsuComponent,
    ListarCatalogoComponent,
    SolicitudComponent,
    HomeComponent,
    AdminComponent,
    EmpleadoComponent,
    RHComponent,
    PerfilComponent,
    BandejaAdComponent,
    CatalogoEmpleadoComponent,
    BandejaEmpleadoComponent,
    HomeRHComponent,
    HomeAdminComponent,
    HomeEmpComponent,
    SoliAcepComponent,
    SoliRechaComponent,
    SoliRevisarComponent
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
