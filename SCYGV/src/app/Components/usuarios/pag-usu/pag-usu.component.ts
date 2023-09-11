import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Rol } from 'src/app/modelo/rol';
import { Usuario} from 'src/app/modelo/usuario';
import { RolService } from 'src/app/services/rol.service';
import { usuarioService } from 'src/app/services/usuario.service';
import swal from'sweetalert2';
@Component({
  selector: 'app-pag-usu',
  templateUrl: './pag-usu.component.html',
  styleUrls: ['./pag-usu.component.css']
})
export class PagUsuComponent {

  
  LRoles !: Rol[];
  //Se utiliza para mostrar el usuario
  LUsuarios !: Usuario[];
  //Form
  FormUsu: FormGroup
  //Iniciar el boton desactivado
  
  id:number = 0

  mostrarC: boolean = true;
  mostrarA: boolean = false;
  constructor(private UService:usuarioService, private fb:FormBuilder, private rService : RolService){
    //Formulario para trabajar con los Usuarios
    this.FormUsu = fb.group({
      id : new FormControl(),
      nombre : new FormControl('',[Validators.required]),
      apellidos : new FormControl('',[Validators.required]), 
      contrasena : new FormControl('',[Validators.required]),
      correo : new FormControl('',[Validators.required]),
      rol : new FormControl('',[Validators.required]),
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
    this.getRol()
  }

   //Mostrar Rol
getRol():any{
  this.rService.getRol().subscribe(res =>{
    this.LRoles = <any>res
    console.log(res)
  })
}

  
  //Mostrar Usuarios
  getUsuario():any{
    this.mostrarC = true;
    this.UService.getUsuario().subscribe(res =>{
      this.LUsuarios = <any>res
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
      usuario.rol = this.FormUsu.get('rol')?.value
      usuario.rfc = this.FormUsu.get('rfc')?.value
      usuario.curp = this.FormUsu.get('curp')?.value
      usuario.n_c_prof = this.FormUsu.get('n_c_prof')?.value
      usuario.u_g_estudio = this.FormUsu.get('u_g_estudio')?.value
      usuario.f_ingreso = this.FormUsu.get('f_ingreso')?.value
      usuario.especialidad = this.FormUsu.get('especialidad')?.value
      usuario.telefono = this.FormUsu.get('telefono')?.value
      this.UService.createUsuario(usuario).subscribe(res =>
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
      usuario.rol = this.FormUsu.get('rol')?.value
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
      this.FormUsu.get('id')?.setValue(usuario.id)
      this.FormUsu.get('nombre')?.setValue(usuario.nombres)
      this.FormUsu.get('apellidos')?.setValue(usuario.apellidos)
      this.FormUsu.get('contrasena')?.setValue(usuario.contrasena)
      this.FormUsu.get('correo')?.setValue(usuario.correo)
      this.FormUsu.get('rol')?.setValue(usuario.rol)
      this.FormUsu.get('rfc')?.setValue(usuario.rfc)
      this.FormUsu.get('curp')?.setValue(usuario.curp)
      this.FormUsu.get('n_c_prof')?.setValue(usuario.n_c_prof)
      this.FormUsu.get('u_g_estudio')?.setValue(usuario.u_g_estudio)
      this.FormUsu.get('f_ingreso')?.setValue(usuario.f_ingreso)
      this.FormUsu.get('especialidad')?.setValue(usuario.especialidad)
      this.FormUsu.get('telefono')?.setValue(usuario.telefono)
  }
  
  //Mostrar Usuario por Id
getUserId(idUsu: number):any{
  this.UService.getIdUsuario(idUsu).subscribe(res =>{
    this.LUsuarios = <any>res
    console.log(res)
  })
}
  //Funcion para limpar el formulario
  limpiar():any{this.mostrarC = true;this.mostrarA = false;this.FormUsu.reset()}
 
}
