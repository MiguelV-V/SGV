import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelo/usuario';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  NombreUsuario : any = localStorage.getItem("Nombres")! + " " +localStorage.getItem("Apellidos");

  constructor(private Uservice:usuarioService){}
   ngOnInit():void{
    this.getUser()
  }
  LUsuario !: Usuario[];
  userId !: string; // Inicializa la variable userId
  selectedImage: File | null = null;
  // Variable para almacenar el nombre del archivo
  selectedFileName !: string;
  nombreImagen !: string;
  customName: string | null = null;
  rutaFoto !: any;

  getUser():any{
    this.Uservice.getIdUsuario().subscribe((res: any) => { // Cambia any al tipo correcto si es diferente de JSON
      this.LUsuario = res as Usuario[]; // Convierte la respuesta JSON a un array de Usuario
      console.log(res);

      // Verifica si la lista de usuarios no está vacía y si el primer usuario tiene un ID
      if (this.LUsuario.length > 0 && this.LUsuario[0].id !== undefined) {
        this.userId = this.LUsuario[0].id; // Guarda el ID del primer usuario en userId
      }
      if (this.LUsuario.length > 0 && this.LUsuario[0].foto !== undefined) {
        this.rutaFoto = this.LUsuario[0].foto;
      }
    });
  }

  // Función para obtener la extensión de un archivo dado su nombre
  getFileExtension(fileName: string): string {
    // Divide el nombre del archivo en partes utilizando el punto como separador
    const parts = fileName.split('.');
    // Obtiene la última parte que debería ser la extensión
    const extension = parts[parts.length - 1];
    return extension;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.selectedFileName = this.selectedImage.name; // Guarda el nombre del archivo en la variable
      const fileExtension = this.getFileExtension(this.selectedImage.name); // Obtiene la extensión del archivo
      this.nombreImagen = this.userId + "." + fileExtension;
      console.log(this.nombreImagen);
      this.uploadImage();
    }
  }

  rutaImagen() {
    const id = this.userId;
    const imageName = this.nombreImagen;
    const requestBody = { /* Tus datos de solicitud */ };

    this.Uservice.rutaImagen(id, imageName, requestBody).subscribe(
      (response) => {
        // Maneja la respuesta exitosa aquí
        console.log('Imagen actualizada:', response);
      },
      (error) => {
        // Maneja el error aquí
        console.error('Error al actualizar la imagen:', error);
      }
    );
  }

  uploadImage() {
    if (!this.selectedImage) {
      alert('Selecciona una imagen primero.');
      return;
    }
  
    this.Uservice.uploadImage(this.selectedImage, this.userId, this.nombreImagen).subscribe(
      (response) => {
        alert('Imagen subida exitosamente.');
        this.rutaImagen();
      },
      (error) => {
        alert('Error al subir la imagen.');
        console.error(error);
      }
    );
    
  }

}
