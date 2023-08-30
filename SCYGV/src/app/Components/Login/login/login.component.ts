import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { usuarioService } from 'src/app/services/usuario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Alerta
  alert:Boolean = false
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
        if(res == true){ 
          this.router.navigateByUrl('/Roles');
        }
        else
        {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo o la contraseña son inválidos, intentalo de nuevo...',
          })
        }
      });
    }
  }
}

