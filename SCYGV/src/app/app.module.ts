import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';

import { BodyComponent } from './Components/body/body.component';
import { PagUsuComponent } from './Components/usuarios/pag-usu/pag-usu.component';
import { Routes, RouterModule } from '@angular/router';


const appRoute : Routes = [ 
  {path: 'Roles', component: BodyComponent },
  {path: 'Usuarios', component: PagUsuComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    PagUsuComponent
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
