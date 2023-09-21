import {Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Rol } from 'src/app/modelo/rol';
import { RolService } from 'src/app/services/Rol/rol.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
//Se utiliza para mostrar Roles
LRoles !: Rol[];
//Form
FormRol: FormGroup
//Iniciar boton en desactivado
isClicked: boolean = true;

constructor(private rService:RolService, fb:FormBuilder){
  //Formulario para trabajar con los Roles
  this.FormRol = fb.group({
    rol : new FormControl('',[Validators.required]),
  })
}

//Iniciar la muestra de roles
ngOnInit():void{
  this.getRol()
}


//Mostrar Rol
getRol():any{
  this.rService.getRol().subscribe(res =>{
    this.LRoles = <any>res
    console.log(res)
  })
}

//Crear Rol
createRol(){
  if(this.FormRol.valid){
      let rol = new Rol()
      rol.rol = this.FormRol.get('rol')?.value
      this.rService.createRol(rol).subscribe(res =>
        this.getRol(),
        this.limpiar()
      )}
}

//Eliminar Rol
deleteRol(idRol : any){
  this.rService.deleteRol(idRol).subscribe(res =>{
    console.log('Rol Eliminado')
    this.getRol()
  },error => console.log(error))
}

//Actualizar Rol
updateRol(idrol : any){
  if(this.FormRol.valid)
  {
    let rol = new Rol()
    rol.rol = this.FormRol.get('rol')?.value
    this.rService.updateRol(idrol,rol).subscribe(res =>
      this.getRol(),
      this.limpiar(), 
      this.Desactivar()
    )}
  }

//Funcion para editar Roles
editarRol(rol:Rol){
  this.FormRol.get('rol')?.setValue(rol.rol)
  this.Activar()
}
//Mostrar Rol por Id
getRolId(idRol: number):any{
  this.rService.getIdRol(idRol).subscribe(res =>{
    this.LRoles = <any>res
    console.log(res)
  })
}
//Funcion para limpiar el Formulario
limpiar():any{this.FormRol.reset()}
//Funcion para activar el boton Actualizar
Activar():any{this.isClicked = false}
//Funcion para desactivar el boton Actualizar
Desactivar():any{this.isClicked = true}
}






