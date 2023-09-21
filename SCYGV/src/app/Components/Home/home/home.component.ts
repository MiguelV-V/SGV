import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
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
 Admin:number = 1
 RH:number = 2
 Empleado:number = 3
 //Form Logear
 FormLogin : FormGroup

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
      let usulogin = new Usuario()
      usulogin.correo = this.FormLogin.get('correo')?.value
      usulogin.contrasena = this.FormLogin.get('contrasena')?.value
      this.UService.postLog(usulogin).subscribe(res =>{
        if(res == this.Admin){ 
          console.log(res);
          this.router.navigateByUrl('/Administrador/HomeAdmin');
          this.FormLogin.reset();
        }
        else if(res == this.RH){
          this.router.navigateByUrl('/RH/HomeRH');
          this.FormLogin.reset();
        }
        else if(res == this.Empleado){
          this.router.navigateByUrl('/Empleado/HomeEmpleado');
          this.FormLogin.reset();
        }
        else{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo o la contraseña son inválidos, intentalo de nuevo...',})}
            this.FormLogin.markAllAsTouched();
            
      });

    }
  }
}
