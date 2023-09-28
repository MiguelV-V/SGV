import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelo/usuario';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  LUsuario !: Usuario[];
userId !: string; // Inicializa la variable userId
  selectedImage: File | null = null;
  customName: string | null = null;

  constructor(private Uservice:usuarioService){}
   ngOnInit():void{
    this.getUser()
  }
  
  getUser():any{
    this.Uservice.getIdUsuario().subscribe((res: any) => { // Cambia "any" al tipo correcto si es diferente de JSON
      this.LUsuario = res as Usuario[]; // Convierte la respuesta JSON a un array de Usuario
      console.log(res);

      // Verifica si la lista de usuarios no está vacía y si el primer usuario tiene un ID
      if (this.LUsuario.length > 0 && this.LUsuario[0].id !== undefined) {
        this.userId = this.LUsuario[0].id; // Guarda el ID del primer usuario en userId
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedImage) {
      alert('Selecciona una imagen primero.');
      return;
    }

    this.Uservice.uploadImage(this.selectedImage, this.userId).subscribe(
      (response) => {
        alert('Imagen subida exitosamente.');
        // Aquí puedes manejar la respuesta de la API
      },
      (error) => {
        alert('Error al subir la imagen.');
        console.error(error);
      }
    );
  }
}
