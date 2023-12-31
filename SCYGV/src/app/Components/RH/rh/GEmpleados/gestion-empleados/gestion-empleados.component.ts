import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Rol } from 'src/app/modelo/rol';
import { Usuario } from 'src/app/modelo/usuario';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.css']
})
export class GestionEmpleadosComponent {

  LRoles !: Rol[];
  //Se utiliza para mostrar el usuario
  LEmpleados !: Usuario[];
  //Form
  FormUsu: FormGroup
  //Iniciar el boton desactivado
  id:number = 0

  mostrarC: boolean = true;
  mostrarA: boolean = false;
  mostrarTAdd: boolean = true;
  mostrarTAct: boolean = false;
  constructor(private UService:usuarioService, private fb:FormBuilder){
    //Formulario para trabajar con los Usuarios
    this.FormUsu = fb.group({
      id : new FormControl(),
      nombre : new FormControl('',[Validators.required]),
      apellidos : new FormControl('',[Validators.required]), 
      contrasena : new FormControl('',[Validators.required]),
      correo : new FormControl('',[Validators.required]),
      rfc : new FormControl('',[Validators.required]),
      curp : new FormControl('',[Validators.required]),
      n_c_prof : new FormControl('',[Validators.required]),
      u_g_estudio : new FormControl('',[Validators.required]),
      f_ingreso : new FormControl('',[Validators.required]),
      especialidad : new FormControl('',[Validators.required]),
      telefono : new FormControl('',[Validators.required])
    })
  
    
  }
  //Iniciar la muestra de Usuarios
  ngOnInit():void{
    this.getUsuario()
    
  }

  

  
  //Mostrar Usuarios
  getUsuario():any{
    this.mostrarC = true;
    this.UService.getEmpleados().subscribe(res =>{
      this.LEmpleados = <any>res
      console.log(res)})
  }

  //Crear Usuario
  createUsuario(){
    if(this.FormUsu.valid)
    {
      let usuario = new Usuario()
      usuario.nombres = this.FormUsu.get('nombre')?.value
      usuario.apellidos = this.FormUsu.get('apellidos')?.value
      usuario.contrasena = this.FormUsu.get('contrasena')?.value
      usuario.correo = this.FormUsu.get('correo')?.value
      usuario.rfc = this.FormUsu.get('rfc')?.value
      usuario.curp = this.FormUsu.get('curp')?.value
      usuario.n_c_prof = this.FormUsu.get('n_c_prof')?.value
      usuario.u_g_estudio = this.FormUsu.get('u_g_estudio')?.value
      usuario.f_ingreso = this.FormUsu.get('f_ingreso')?.value
      usuario.especialidad = this.FormUsu.get('especialidad')?.value
      usuario.telefono = this.FormUsu.get('telefono')?.value
      this.UService.postEmpleadosCreate(usuario).subscribe(res =>
        this.getUsuario(),
        this.limpiar())
        swal.fire({
        icon: 'success',
        title: 'Se creo correctamente el Usuario',
        showConfirmButton: false,
        timer: 1500
      })}
     else{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Faltan datos por rellenar...',})
      }
  }

  //Eliminar Usuario
  deleteUsuario(idUsu : any){
    swal.fire({
        text: "¿Está seguro que desea eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
      if (resultado.value) {
      this.UService.deleteUsuario(idUsu).subscribe(res =>{
      console.log(res)
      this.getUsuario()
    },error => console.log(error))
  }})
  }

  //Actualizar Usuario
  updateUsuario(idUsu : any){
    if(this.FormUsu.valid)
    {
      let usuario = new Usuario()
      usuario.id = this.FormUsu.get('id')?.value
      usuario.nombres = this.FormUsu.get('nombre')?.value
      usuario.apellidos = this.FormUsu.get('apellidos')?.value
      usuario.contrasena = this.FormUsu.get('contrasena')?.value
      usuario.correo = this.FormUsu.get('correo')?.value
      usuario.rfc = this.FormUsu.get('rfc')?.value
      usuario.curp = this.FormUsu.get('curp')?.value
      usuario.n_c_prof = this.FormUsu.get('n_c_prof')?.value
      usuario.u_g_estudio = this.FormUsu.get('u_g_estudio')?.value
      usuario.f_ingreso = this.FormUsu.get('f_ingreso')?.value
      usuario.especialidad = this.FormUsu.get('especialidad')?.value
      usuario.telefono = this.FormUsu.get('telefono')?.value
      idUsu = usuario.id;
      this.UService.updateUsuario(idUsu,usuario).subscribe(res =>
        this.getUsuario(),
        this.limpiar(),
      )}
    }
    
    //Funcion para editar el usuario
    editar(usuario:Usuario){
      this.mostrarC = false;
      this.mostrarA = true;
      this.mostrarTAdd = false;
      this.mostrarTAct = true;
      this.FormUsu.get('id')?.setValue(usuario.id)
      this.FormUsu.get('nombre')?.setValue(usuario.nombres)
      this.FormUsu.get('apellidos')?.setValue(usuario.apellidos)
      this.FormUsu.get('contrasena')?.setValue(usuario.contrasena)
      this.FormUsu.get('correo')?.setValue(usuario.correo)
      this.FormUsu.get('rfc')?.setValue(usuario.rfc)
      this.FormUsu.get('curp')?.setValue(usuario.curp)
      this.FormUsu.get('n_c_prof')?.setValue(usuario.n_c_prof)
      this.FormUsu.get('u_g_estudio')?.setValue(usuario.u_g_estudio)
      this.FormUsu.get('f_ingreso')?.setValue(usuario.f_ingreso)
      this.FormUsu.get('especialidad')?.setValue(usuario.especialidad)
      this.FormUsu.get('telefono')?.setValue(usuario.telefono)
  }
  
 
  //Funcion para limpar el formulario
  limpiar():any{this.mostrarC = true;this.mostrarA = false;this.mostrarTAdd = true; this.mostrarTAct = false; this.FormUsu.reset()}
}

