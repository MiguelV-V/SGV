export class Usuario{
    id ?: any
    nombres ?: String
    apellidos ?: String
    contrasena ?: String
    correo ?: String
    rol ?:number
    rfc ?: String
    curp ?: String
    n_c_prof ?: String
    u_g_estudio ?: String
    f_ingreso ?: Date
    especialidad ?: String
    telefono ?: String
    foto ?: String
}

export interface userRes{
    id: number
    rol: string
    nombres : string
    apellidos : string
}