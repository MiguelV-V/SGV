import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelo/usuario';
import { SolicitudService } from 'src/app/services/Solicitudes/solicitud.service';
import { usuarioService } from 'src/app/services/Usuario/usuario.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  constructor(private Uservice:usuarioService, private SoliSer:SolicitudService){}
   ngOnInit():void{
    this.getUser()
    this.getrevcount()
  }
  LUsuario !: Usuario[];
  userId !: string; // Inicializa la variable userId
  selectedImage: File | null = null;
  // Variable para almacenar el nombre del archivo
  selectedFileName !: string;
  nombreImagen !: string;
  customName: string | null = null;
  rutaFoto !: any;
  TSoli:number = 0;

  getrevcount():any{
    this.SoliSer.getSoliprocount().subscribe((res) => {
      this.TSoli = <any> res;
    })
  }

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
      if(fileExtension != "jpg"){
        console.log("La extension no", fileExtension)
      }
      else{
      this.nombreImagen = this.userId + "." + fileExtension;
      console.log(this.nombreImagen);
      this.uploadImage();
      }
    }
  }

  rutaImagen() {
    const imageName = this.nombreImagen;
    const requestBody = { /* Tus datos de solicitud */ };
    if(this.rutaFoto == null){
      this.Uservice.rutaImagen(imageName, requestBody).subscribe(
        (response) => {
          // Maneja la respuesta exitosa aquí
          console.log('Imagen actualizada:', response);
          this.getUser()
        },
        (error) => {
          // Maneja el error aquí
          console.error('Error al actualizar la imagen:', error);
        }
      );
    }
  }

  uploadImage() {
    if (!this.selectedImage) {
      alert('Selecciona una imagen primero.');
      return;
    }
  
    this.Uservice.uploadImage(this.selectedImage,this.nombreImagen).subscribe(
      (response) => {
        console.log(response)
        this.rutaImagen();
        location.reload()
      },
      (error) => {
        alert('Error al subir la imagen.');
        console.error(error);
      }
    );
    
  }

}
