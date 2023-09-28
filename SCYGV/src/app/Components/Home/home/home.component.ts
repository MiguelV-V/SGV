import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/modelo/rol';
import { Usuario, userRes } from 'src/app/modelo/usuario';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';
import swal from'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 //Alerta
 alert:Boolean = false
 //Form Logear
 FormLogin : FormGroup

 correo : String = ""
 contrasena : String = ""
 respuesta!: userRes[];
 

 constructor(private UService:usuarioService, private fb:FormBuilder, private router:Router){
   this.FormLogin = fb.group({
     correo : new FormControl('',[Validators.required]),
     contrasena : new FormControl('',[Validators.required]),
   })
 }
 
  //login
  login(){
    if(this.FormLogin.valid)
    {
      this.correo = this.FormLogin.get('correo')?.value
      this.contrasena = this.FormLogin.get('contrasena')?.value
      this.UService.postLog(this.correo,this.contrasena).subscribe(res =>{
        this.respuesta = <any>res;
        console.log(res)
        if(this.respuesta[0] == null){
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El correo o la contraseña son inválidos, intentalo de nuevo...',})
        }
        else if(this.respuesta[0].rol == "1"){ 
          this.router.navigateByUrl('/Administrador/HomeAdmin');
          localStorage.setItem("Id",this.respuesta[0].id.toString())
          localStorage.setItem("Nombres",this.respuesta[0].nombres)
          localStorage.setItem("Apellidos",this.respuesta[0].apellidos)
          localStorage.setItem("Rol",this.respuesta[0].rol)
          this.FormLogin.reset();
        }
        else if(this.respuesta[0].rol == "2"){
          this.router.navigateByUrl('/RH/HomeRH');
          localStorage.setItem("Id",this.respuesta[0].id.toString())
          localStorage.setItem("Nombres",this.respuesta[0].nombres)
          localStorage.setItem("Apellidos",this.respuesta[0].apellidos)
          localStorage.setItem("Rol",this.respuesta[0].rol)
          this.FormLogin.reset();
        }
        else if(this.respuesta[0].rol == "3"){
          this.router.navigateByUrl('/Empleado/HomeEmpleado');
          localStorage.setItem("Id",this.respuesta[0].id.toString())
          localStorage.setItem("Nombres",this.respuesta[0].nombres)
          localStorage.setItem("Apellidos",this.respuesta[0].apellidos)
          localStorage.setItem("Rol",this.respuesta[0].rol)
          this.FormLogin.reset();
        }
      });
    }
    else{
      swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Se necesita el correo o contraseña',})}
  }
}
