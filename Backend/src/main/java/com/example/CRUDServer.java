package com.example;
import static spark.Spark.*;

import java.io.FileOutputStream;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.util.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.MultipartConfigElement;
import java.io.InputStream;
import com.google.gson.Gson;

public class CRUDServer {

    public static String FechaIngreso;
    public static void main(String[] args) {


        // Configuración de la conexión a la base de datos MySQL
        String url = "jdbc:mysql://158.101.15.82:3306/scygv";
        String username = "SCYGV";
        String password = "yAB4F2pDNY56WAsZ";

        port(3000);

        // Configurar encabezado de respuesta como JSON
        after((req, res) -> {
            res.type("application/json");
        });

        // Configurar los encabezados CORS para permitir solicitudes desde cualquier
        // origen (*)
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        // Crear una instancia de Gson
        Gson gson = new Gson();

        // CRUD ROLES

        // Ruta para obtener todos los roles
        get("/roles", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_ROLES";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                List<Rol> roles = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("ID");
                    String nombre = resultSet.getString("ROL");
                    roles.add(new Rol(id, nombre));
                }

                return gson.toJson(roles);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los roles"));
            }
        });

        // Ruta para crear un nuevo rol
        post("/roles", (req, res) -> {
            Rol rol = gson.fromJson(req.body(), Rol.class);
            String nombreRol = rol.getNombre();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "INSERT INTO SCYGV_ROLES (ROL) VALUES (?)";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, nombreRol);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Rol creado correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al crear el rol"));
            }
        }, gson::toJson);

        // Ruta para eliminar rol
        delete("/roles/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "DELETE FROM SCYGV_ROLES where ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                int affectedrows = statement.executeUpdate();

                if (affectedrows > 0) {
                    return gson.toJson(new Respuesta("Rol eliminado correctamente"));
                } else {
                    return gson.toJson(new Respuesta("No se encontro ninun reisro con el ID digitado"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al eliminar el rol"));
            }
        }, gson::toJson);

        // Ruta para actualizar rol
        put("/roles/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Rol rol = gson.fromJson(req.body(), Rol.class);
            String Nrol = rol.getNombre();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_ROLES SET ROL = ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, Nrol);
                statement.setInt(2, id);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Se actualizo correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al actualizar el rol"));
            }
        }, gson::toJson);

        // Ruta para obtener rol por id
        get("/roles/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_ROLES WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                ResultSet resultSet = statement.executeQuery();

                List<Rol> roles = new ArrayList<>();
                while (resultSet.next()) {
                    int Id = resultSet.getInt("ID");
                    String nombre = resultSet.getString("ROL");
                    roles.add(new Rol(Id, nombre));
                }
                return gson.toJson(roles);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los roles"));
            }
        });

        // CRUD USUARIOS
        // OBTENER USUARIOS
        get("/usuario", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_USUARIOS";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                List<Usuarios> usuarios = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String nombres = resultSet.getString("nombres");
                    String apellidos = resultSet.getString("apellidos");
                    String contrasena = resultSet.getString("contraseña");
                    String correo = resultSet.getString("correo");
                    int rol = resultSet.getInt("rol");
                    String rfc = resultSet.getString("rfc");
                    String curp = resultSet.getString("curp");
                    String n_c_prof = resultSet.getString("n_c_prof");
                    String u_g_estudio = resultSet.getString("u_g_estudio");
                    String f_ingreso =  devolverFecha(resultSet.getDate("f_ingreso"));
                    String especialidad = resultSet.getString("especialidad");
                    String telefono = resultSet.getString("telefono");
                    String foto = resultSet.getString("foto");
                    usuarios.add(new Usuarios(id, nombres, apellidos, contrasena, correo, rol, rfc, curp,
                            n_c_prof, u_g_estudio, f_ingreso, especialidad, telefono, foto));
                }
                return gson.toJson(usuarios);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los usuarios"));
            }
        });

        // OBTENER EMPLEADOS PARA RH
        get("/ListaEmpleados", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_USUARIOS WHERE ROL = 3 ";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                List<Usuarios> usuarios = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String nombres = resultSet.getString("nombres");
                    String apellidos = resultSet.getString("apellidos");
                    String contrasena = resultSet.getString("contraseña");
                    String correo = resultSet.getString("correo");
                    int rol = resultSet.getInt("rol");
                    String rfc = resultSet.getString("rfc");
                    String curp = resultSet.getString("curp");
                    String n_c_prof = resultSet.getString("n_c_prof");
                    String u_g_estudio = resultSet.getString("u_g_estudio");
                    String f_ingreso =  devolverFecha(resultSet.getDate("f_ingreso"));
                    String especialidad = resultSet.getString("especialidad");
                    String telefono = resultSet.getString("telefono");
                    String foto = resultSet.getString("foto");
                    usuarios.add(new Usuarios(id, nombres, apellidos, contrasena, correo, rol, rfc, curp,
                            n_c_prof, u_g_estudio, f_ingreso, especialidad, telefono, foto));
                }
                return gson.toJson(usuarios);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los usuarios"));
            }
        });

        // Ruta para crear Usuarios solo Administrador
        post("/usuario", (req, res) -> {
            Usuarios usuario = gson.fromJson(req.body(), Usuarios.class);
            String nombres = usuario.getNombres();
            String apellidos = usuario.getApellidos();
            String contrasena = usuario.getContrasena();
            String correo = usuario.getCorreo();
            int rol = usuario.getRol();
            String rfc = usuario.getRFC();
            String curp = usuario.getCurp();
            String n_c_prof = usuario.getNCProf();
            String u_g_estudio = usuario.getUGEstudio();
            String f_ingreso = usuario.getFIngreso();
            FechaIngreso = f_ingreso;
            String especialidad = usuario.getEspecialidad();
            String telefono = usuario.getTelefono();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "INSERT INTO SCYGV_USUARIOS (NOMBRES, APELLIDOS, CONTRASEÑA, CORREO, ROL, RFC, CURP, N_C_PROF, U_G_ESTUDIO, F_INGRESO, ESPECIALIDAD, TELEFONO) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, nombres);
                statement.setString(2, apellidos);
                statement.setString(3, contrasena);
                statement.setString(4, correo);
                statement.setInt(5, rol);
                statement.setString(6, rfc);
                statement.setString(7, curp);
                statement.setString(8, n_c_prof);
                statement.setString(9, u_g_estudio);
                statement.setString(10,f_ingreso);
                statement.setString(11, especialidad);
                statement.setString(12, telefono);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Usuario creado correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al crear el Usuario"));
            }
        }, gson::toJson);

        // Ruta para crear nuevos Empleados
        post("/empleados", (req, res) -> {
            Usuarios usuario = gson.fromJson(req.body(), Usuarios.class);
            String nombres = usuario.getNombres();
            String apellidos = usuario.getApellidos();
            String contrasena = usuario.getContrasena();
            String correo = usuario.getCorreo();
            int rol = 3;
            String rfc = usuario.getRFC();
            String curp = usuario.getCurp();
            String n_c_prof = usuario.getNCProf();
            String u_g_estudio = usuario.getUGEstudio();
            String f_ingreso = usuario.getFIngreso();
            FechaIngreso = f_ingreso;
            String especialidad = usuario.getEspecialidad();
            String telefono = usuario.getTelefono();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "INSERT INTO SCYGV_USUARIOS (NOMBRES, APELLIDOS, CONTRASEÑA, CORREO, ROL, RFC, CURP, N_C_PROF, U_G_ESTUDIO, F_INGRESO, ESPECIALIDAD, TELEFONO) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, nombres);
                statement.setString(2, apellidos);
                statement.setString(3, contrasena);
                statement.setString(4, correo);
                statement.setInt(5, rol);
                statement.setString(6, rfc);
                statement.setString(7, curp);
                statement.setString(8, n_c_prof);
                statement.setString(9, u_g_estudio);
                statement.setString(10,f_ingreso);
                statement.setString(11, especialidad);
                statement.setString(12, telefono);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Usuario creado correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al crear el Usuario"));
            }
        }, gson::toJson);

        // Ruta para eliminar usuario
        delete("/usuario/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "DELETE FROM SCYGV_USUARIOS WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                int affectedrows = statement.executeUpdate();

                if (affectedrows > 0) {
                    return gson.toJson(new Respuesta("Usuario eliminado correctamente"));
                } else {
                    return gson.toJson(new Respuesta("No se encontro ninun registro con el id digitado"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al eliminar el usuario"));
            }
        }, gson::toJson);

        // Ruta para modificar usuarios
        put("/usuario/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Usuarios usuario = gson.fromJson(req.body(), Usuarios.class);
            String nombres = usuario.getNombres();
            String apellidos = usuario.getApellidos();
            String contrasena = usuario.getContrasena();
            String correo = usuario.getCorreo();
            int rol = usuario.getRol();
            String rfc = usuario.getRFC();
            String curp = usuario.getCurp();
            String n_c_prof = usuario.getNCProf();
            String u_g_estudio = usuario.getUGEstudio();
            String f_ingreso = usuario.getFIngreso();
            String especialidad = usuario.getEspecialidad();
            String telefono = usuario.getTelefono();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_USUARIOS SET NOMBRES = ?, APELLIDOS = ?, CONTRASEÑA = ?, CORREO = ?, ROL = ?, RFC = ?, CURP = ?, N_C_PROF = ?, U_G_ESTUDIO = ?, F_INGRESO = ?, ESPECIALIDAD = ?, TELEFONO =  ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, nombres);
                statement.setString(2, apellidos);
                statement.setString(3, contrasena);
                statement.setString(4, correo);
                statement.setInt(5, rol);
                statement.setString(6, rfc);
                statement.setString(7, curp);
                statement.setString(8, n_c_prof);
                statement.setString(9, u_g_estudio);
                statement.setString(10, f_ingreso);
                statement.setString(11, especialidad);
                statement.setString(12, telefono);
                statement.setInt(13, id);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Se actualizo correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al actualizar el usuario"));
            }
        }, gson::toJson);

        // Ruta para obtener usuarios por id
        get("/usuario/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_USUARIOS WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                ResultSet resultSet = statement.executeQuery();
                List<Usuarios> usuarios = new ArrayList<>();
                while (resultSet.next()) {
                    int Id = resultSet.getInt("id");
                    String nombres = resultSet.getString("nombres");
                    String apellidos = resultSet.getString("apellidos");
                    String contrasena = resultSet.getString("contraseña");
                    String correo = resultSet.getString("correo");
                    int rol = resultSet.getInt("rol");
                    String rfc = resultSet.getString("rfc");
                    String curp = resultSet.getString("curp");
                    String n_c_prof = resultSet.getString("n_c_prof");
                    String u_g_estudio = resultSet.getString("u_g_estudio");
                    String f_ingreso =  devolverFecha(resultSet.getDate("f_ingreso"));
                    String especialidad = resultSet.getString("especialidad");
                    String telefono = resultSet.getString("telefono");
                    String foto = resultSet.getString("foto");
                    usuarios.add(new Usuarios(Id, nombres, apellidos, contrasena, correo, rol, rfc, curp,
                            n_c_prof, u_g_estudio,f_ingreso, especialidad, telefono, foto));
                }
                return gson.toJson(usuarios);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener el Usuario"));
            }
        });

        // Ruta para obtener todos los catálogos
        get("/catalogos", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_CATALOGO ORDER BY DIAS_VAC ASC";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                List<Catalogo> catalogos = new ArrayList<>();
                while (resultSet.next()) {
                    String añosLab = resultSet.getString("AÑOS_LAB");
                    int diasVac = resultSet.getInt("DIAS_VAC");
                    catalogos.add(new Catalogo(añosLab, diasVac));
                }

                return gson.toJson(catalogos);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los catálogos"));
            }
        });

        // Ruta para obtener un catálogo en específico
        get("/catalogos/:añosLab", (req, res) -> {
            String añosLab = req.params(":añosLab");

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_CATALOGO WHERE AÑOS_LAB = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, añosLab);
                ResultSet resultSet = statement.executeQuery();

                if (resultSet.next()) {
                    int diasVac = resultSet.getInt("DIAS_VAC");
                    return gson.toJson(new Catalogo(añosLab, diasVac));
                } else {
                    return gson.toJson(
                            new Respuesta("El catálogo con los años de labor proporcionados no fue encontrado."));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener el catálogo."));
            }
        });

        // Ruta para crear un nuevo catálogo
        post("/catalogos", (req, res) -> {
            String requestBody = req.body();
            Catalogo nuevoCatalogo = gson.fromJson(requestBody, Catalogo.class);

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "INSERT INTO SCYGV_CATALOGO (AÑOS_LAB, DIAS_VAC) VALUES (?, ?)";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, nuevoCatalogo.getAñosLab());
                statement.setInt(2, nuevoCatalogo.getDiasVac());
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Catálogo creado correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al crear el catálogo"));
            }
        }, gson::toJson);

        // Ruta DELETE para eliminar un catálogo por sus años de labor
        delete("/catalogos/:añosLab", (req, res) -> {
            String añosLab = req.params(":añosLab");

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "DELETE FROM SCYGV_CATALOGO WHERE AÑOS_LAB = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, añosLab);
                int affectedRows = statement.executeUpdate();

                if (affectedRows > 0) {
                    return gson.toJson(new Respuesta("Catálogo eliminado correctamente"));
                } else {
                    return gson.toJson(
                            new Respuesta("No se encontró ningún catálogo con los años de labor proporcionados"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al eliminar el catálogo"));
            }
        }, gson::toJson);

        // Ruta PUT para actualizar un catálogo
        put("/catalogos/:añosLab", (req, res) -> {
            String añosLab = req.params(":añosLab");
            String requestBody = req.body();
            Catalogo catalogoActualizado = gson.fromJson(requestBody, Catalogo.class);

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_CATALOGO SET AÑOS_LAB = ?, DIAS_VAC = ? WHERE AÑOS_LAB = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, catalogoActualizado.getAñosLab());
                statement.setInt(2, catalogoActualizado.getDiasVac());
                statement.setString(3, añosLab);
                int affectedRows = statement.executeUpdate();

                if (affectedRows > 0) {
                    return gson.toJson(new Respuesta("Catálogo actualizado correctamente"));
                } else {
                    return gson.toJson(
                            new Respuesta("No se encontró ningún catálogo con los años de labor proporcionados"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al actualizar el catálogo"));
            }
        }, gson::toJson);

        // CRUD SOLICITUDES
        // OBTENER SOLICITUDES EN REVISION PARA RH
        get("/soli_enrev", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ESTADO = 'En revision'";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });
         // OBTENER SOLICITUDES EN REVISION PARA ADMIN
        get("/soli_estado", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE OBSERVACIONES = 'En proceso de Autorización'";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });

        // OBTENER TOTAL SOLICITUDES EN REVISAR RH
        get("/solirev_count", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT COUNT(ID) as SOLICITUDES FROM SCYGV_SOLICITUDES WHERE ESTADO = 'En revision'";
                PreparedStatement statement = conn.prepareStatement(query);
                int id = 0;
                ResultSet resultSet = statement.executeQuery();
                while (resultSet.next()) {
                    id = resultSet.getInt("SOLICITUDES");
                    return id;
                }
                return id;
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });

         get("/soliproc_count", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT COUNT(ID) as SOLICITUDES FROM SCYGV_SOLICITUDES WHERE OBSERVACIONES = 'En proceso de Autorización'";
                PreparedStatement statement = conn.prepareStatement(query);
                int id = 0;
                ResultSet resultSet = statement.executeQuery();
                while (resultSet.next()) {
                    id = resultSet.getInt("SOLICITUDES");
                    return id;
                }
                return id;
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });


         get("/soli_acep", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ESTADO = 'Aceptada'";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });
         get("/soli_recha", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ESTADO = 'Rechazada'";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                     String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });

         get("/solicitudes", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });

        // Ruta para eliminar usuario
        delete("/solicitudes/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "DELETE FROM SCYGV_SOLICITUDES WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                int affectedrows = statement.executeUpdate();

                if (affectedrows > 0) {
                    return gson.toJson(new Respuesta("Solicitud eliminada correctamente"));
                } else {
                    return gson.toJson(new Respuesta("No se encontro ninun registro con el id digitado"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al eliminar la solicitud"));
            }
        }, gson::toJson);

        put("/solicitudes/:id/:id_user", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            int id_user = Integer.parseInt(req.params("id_user"));
            Solicitud solicitud = gson.fromJson(req.body(), Solicitud.class);
            String nombres = solicitud.getNombres();
            String reviso = "Aun no han revisado...";
            DateTimeFormatter fechahoy = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            String fecha = fechahoy.format(LocalDateTime.now());
            String fecha_i = solicitud.getFecha_I();
            String fecha_f = solicitud.getFecha_F();
            String motivo = solicitud.getMotivo();
            SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
            Date date1 = format.parse(fecha_i);
            Date date2 = format.parse(fecha_f);
            int dias = (int) ((date2.getTime() - date1.getTime())/86400000);
            String estado = "En revision";
            String comentario = "";
            String observaciones = "";
            
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_SOLICITUDES SET ID_USER = ?, NOMBRES = ?, REVISO = ?, FECHA = ?, FECHA_I = ?, FECHA_F = ?,MOTIVO = ?, DIAS = ?, ESTADO = ?, COMENTARIO = ?, OBSERVACIONES = ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id_user);
                statement.setString(2, nombres);
                statement.setString(3, reviso);
                statement.setString(4,fecha);
                statement.setString(5,fecha_i);
                statement.setString(6,fecha_f);
                statement.setString(7, motivo);
                statement.setInt(8, dias);
                statement.setString(9, estado);
                statement.setString(10, comentario);
                statement.setString(11, observaciones);
                statement.setInt(12, id);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Se actualizo correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al actualizar"));
            }
        }, gson::toJson);
         // Ruta para actualizar el estado de una solicitud
        put("/estado/:id/:reviso", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            String reviso = req.params("reviso");
            Solicitud solicitud = gson.fromJson(req.body(), Solicitud.class);
            String estado = solicitud.getEstado();
            String observaciones = "En proceso de Autorización";
            
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_SOLICITUDES SET REVISO = ? ,ESTADO = ?, OBSERVACIONES = ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, reviso);
                statement.setString(2, estado);
                statement.setString(3, observaciones);
                statement.setInt(4, id);
                statement.executeUpdate();
                return gson.toJson(new Respuesta("Se envio la respuesta"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al enviar"));
            }
        }, gson::toJson);

        // Ruta para actualizar la observacion de una solicitud
        put("/observacion/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Solicitud solicitud = gson.fromJson(req.body(), Solicitud.class);
            String observaciones = solicitud.getObservaciones();
            String comentario = solicitud.getComentario();
            if(comentario == null){
                comentario = "No hay comentarios...";
            }
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_SOLICITUDES SET OBSERVACIONES = ?, COMENTARIO = ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, observaciones);
                statement.setString(2, comentario);
                statement.setInt(3, id);
                statement.executeUpdate();
                return gson.toJson(new Respuesta("Se envio la respuesta"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al enviar"));
            }
        }, gson::toJson);

        // Ruta para obtener solicitudes rechazadas
        get("/SoliRechazada/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ID_USER = ? AND (ESTADO = 'RECHAZADA' AND OBSERVACIONES = 'AUTORIZADA')";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int Id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(Id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener la solicitud"));
            }
        });

        //Ruta para obtener solicitudes de usuario con estado aprobada
        get("/SoliAceptada/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ID_USER = ? AND (ESTADO = 'ACEPTADA' AND OBSERVACIONES = 'AUTORIZADA')";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int Id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(Id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener la solicitud"));
            }
        });

        //Ruta para obtener solicitudes En revision Para Cada Usuario
         get("/SoliRevision/:id_user", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                int Id_user = Integer.parseInt(req.params("id_user"));
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ID_USER = ? AND ESTADO = 'En revision' OR OBSERVACIONES = 'En proceso de Autorización'";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, Id_user);
                ResultSet resultSet = statement.executeQuery();
                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int Id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    String nombres = resultSet.getString("nombres");
                    String reviso = resultSet.getString("reviso");
                    String fecha = devolverFecha(resultSet.getDate("fecha"));
                    String fecha_i = devolverFecha(resultSet.getDate("fecha_i"));
                    String fecha_f = devolverFecha(resultSet.getDate("fecha_f"));
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    String comentario = resultSet.getString("comentario");
                    String observaciones = resultSet.getString("observaciones");
                    solicitudes.add(new Solicitud(Id, id_user, nombres, reviso, fecha,fecha_i,fecha_f, motivo, dias, estado, comentario, observaciones));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener la solicitud"));
            }
        });
        //Login User
        post("/login", (req, res) -> {
            Usuarios usuario = gson.fromJson(req.body(), Usuarios.class);
            String correo = usuario.getCorreo();
            String contrasena = usuario.getContrasena();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_USUARIOS WHERE CORREO = ? AND CONTRASEÑA = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, correo);
                statement.setString(2, contrasena);
                ResultSet resultSet = statement.executeQuery();
                List<Login> login = new ArrayList<>();
                while(resultSet.next())
                {
                    int Id = resultSet.getInt("ID");
                    String Rol = resultSet.getString("ROL");
                    String Nombres = resultSet.getString("NOMBRES");
                    String Apellidos = resultSet.getString("APELLIDOS");
                    login.add(new Login(Id,Rol,Nombres,Apellidos));
                }
                return gson.toJson(login);
            } catch (SQLException e) {
                return e;
            }
        });

         // Ruta para dias de vacaciones disponibles
        get("/dias_disponibles/:id_user", (req, res) -> {
            int id_user = Integer.parseInt(req.params("id_user"));
            int dias_disponibles = 0;
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT TIMESTAMPDIFF(YEAR, F_INGRESO, NOW()) AS AÑOS_ANTIGUEDAD FROM SCYGV_USUARIOS WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id_user);
                ResultSet resultSet = statement.executeQuery();
                while(resultSet.next()) {
                    int dias_utilizados = 0;
                    int anos_antiguedad = resultSet.getInt("AÑOS_ANTIGUEDAD");
                    int dias_vac_corres = devolverdias(anos_antiguedad);
                    String query2 = "SELECT SUM(DIAS) AS DIAS_UTILIZADOS FROM SCYGV_SOLICITUDES WHERE ID_USER = ? AND (ESTADO = 'En revision' OR OBSERVACIONES = 'En proceso de Autorización' OR (ESTADO = 'Aceptada' AND OBSERVACIONES = 'Autorizada') OR (ESTADO = 'RECHAZADA' AND OBSERVACIONES = 'No Autorizada'))";
                    PreparedStatement statement2 = conn.prepareStatement(query2);
                    statement2.setInt(1,id_user);
                    ResultSet resultSet2 = statement2.executeQuery();
                    while(resultSet2.next()){
                        dias_utilizados = resultSet2.getInt("DIAS_UTILIZADOS");
                    }
                    dias_disponibles = dias_vac_corres - dias_utilizados;
                }
                return gson.toJson(dias_disponibles).toString();
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los datos de antiguedad del usuario"));
            }
        });

        // Ruta para obtener datos de antiguedad usuario
        get("/antiguedad", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT ID, NOMBRES, APELLIDOS, F_INGRESO, TIMESTAMPDIFF(YEAR, F_INGRESO, NOW()) AS AÑOS_ANTIGUEDAD FROM SCYGV_USUARIOS";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();
                List<AntiguedadUsuario> Antiguedad = new ArrayList<>();
                while(resultSet.next()) {
                    int dias_utilizados = 0;
                    int id = resultSet.getInt("ID");
                    String nombres = resultSet.getString("NOMBRES");
                    String apellidos = resultSet.getString("APELLIDOS");
                    String f_ingreso = resultSet.getString("F_INGRESO");
                    int anos_antiguedad = resultSet.getInt("AÑOS_ANTIGUEDAD");
                    int dias_vac_corres = devolverdias(anos_antiguedad);
                    String query2 = "SELECT SUM(DIAS) AS DIAS_UTILIZADOS FROM SCYGV_SOLICITUDES WHERE ID_USER = ? AND (ESTADO = 'En revision' OR OBSERVACIONES = 'En proceso de Autorización' OR (ESTADO = 'Aceptada' AND OBSERVACIONES = 'Autorizada') OR (ESTADO = 'RECHAZADA' AND OBSERVACIONES = 'No Autorizada'))";
                    PreparedStatement statement2 = conn.prepareStatement(query2);
                    statement2.setInt(1,id);
                    ResultSet resultSet2 = statement2.executeQuery();
                    while(resultSet2.next()){
                        dias_utilizados = resultSet2.getInt("DIAS_UTILIZADOS");
                    }
                    int dias_disponibles = dias_vac_corres - dias_utilizados;
                    Antiguedad.add(new AntiguedadUsuario(id,nombres,apellidos,f_ingreso,anos_antiguedad, dias_vac_corres,dias_utilizados, dias_disponibles));
                }
                return gson.toJson(Antiguedad);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los datos de antiguedad del usuario"));
            }
        });

        // Ruta para crear solicitud
        post("/solicitudes/:id_user", (req, res) -> {
            //Datos digitados por el usuario
            int id_user = Integer.parseInt(req.params("id_user"));
            Solicitud solicitud = gson.fromJson(req.body(), Solicitud.class); 
            String reviso = "Aun no han revisado...";
            DateTimeFormatter fechahoy = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            String fecha = fechahoy.format(LocalDateTime.now());
            String fecha_i = solicitud.getFecha_I();
            String fecha_f = solicitud.getFecha_F();
            String motivo = solicitud.getMotivo();
            SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
            Date date1 = format.parse(fecha_i);
            Date date2 = format.parse(fecha_f);
            int dias = (int) ((date2.getTime() - date1.getTime())/86400000) + 1;
            String estado = "En revision";
            String comentario = "";
            String observaciones = "";
            String respuesta = "";
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                //Query para obtener antiguedad del usuario
                String query2 = "SELECT NOMBRES, F_INGRESO, TIMESTAMPDIFF(YEAR, F_INGRESO, NOW()) AS AÑOS_ANTIGUEDAD FROM SCYGV_USUARIOS WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query2);
                statement.setInt(1,id_user);
                ResultSet resultSet = statement.executeQuery();
                while(resultSet.next()) {
                    int dias_utilizados = 0;
                    int anos_antiguedad = resultSet.getInt("AÑOS_ANTIGUEDAD");
                    String nombres = resultSet.getString("NOMBRES");
                    int dias_vac_corres = devolverdias(anos_antiguedad);
                    //Query para obtener los dias utilizados de las solicitudes
                    String query3 = "SELECT SUM(DIAS) AS DIAS_UTILIZADOS FROM SCYGV_SOLICITUDES WHERE ID_USER = ? AND (ESTADO = 'En revision' OR OBSERVACIONES = 'En proceso de Autorización' OR (ESTADO = 'Aceptada' AND OBSERVACIONES = 'Autorizada') OR (ESTADO = 'RECHAZADA' AND OBSERVACIONES = 'No Autorizada'))";
                    PreparedStatement statement2 = conn.prepareStatement(query3);
                    statement2.setInt(1,id_user);
                    ResultSet resultSet2 = statement2.executeQuery();
                    while(resultSet2.next()){
                        dias_utilizados = resultSet2.getInt("DIAS_UTILIZADOS") + dias;
                        if(dias_utilizados > dias_vac_corres){
                            return respuesta = "Falso Dias";
                        }
                        else{
                            //Query para enviar la solicitud al RH, despues de haber sido validada
                            String query = "INSERT INTO SCYGV_SOLICITUDES (ID_USER, NOMBRES, REVISO, FECHA, FECHA_I, FECHA_F, MOTIVO, DIAS, ESTADO, COMENTARIO, OBSERVACIONES) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
                            PreparedStatement statement1 = conn.prepareStatement(query);
                            statement1.setInt(1, id_user);
                            statement1.setString(2, nombres);
                            statement1.setString(3, reviso);
                            statement1.setString(4,fecha);
                            statement1.setString(5,fecha_i);
                            statement1.setString(6,fecha_f);
                            statement1.setString(7, motivo);
                            statement1.setInt(8, dias);
                            statement1.setString(9, estado);
                            statement1.setString(10, comentario);
                            statement1.setString(11, observaciones);
                            statement1.executeUpdate();
                            return respuesta = "Correcto";
                        }
                    }
                }
                return gson.toJson(respuesta);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al crear la Solicitud"));
            }
        }, gson::toJson);

        get("/permiso_solicitud/:id_user", (req, res) -> {
            //Datos digitados por el usuario
            int id_user = Integer.parseInt(req.params("id_user"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                //Query para obtener antiguedad del usuario
                String query2 = "SELECT TIMESTAMPDIFF(YEAR, F_INGRESO, NOW()) AS AÑOS_ANTIGUEDAD FROM SCYGV_USUARIOS WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query2);
                statement.setInt(1,id_user);
                ResultSet resultSet = statement.executeQuery();
                while(resultSet.next()) {
                    int anos_antiguedad = resultSet.getInt("AÑOS_ANTIGUEDAD");
                    if(anos_antiguedad == 0){
                       return false;
                    }
                    else{
                        return true;
                    }
                }
                return gson.toJson("No se encontro el usuario");
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("No se pudo obtener los años de antiguedad"));
            }
        }, gson::toJson);

        post("/upload", (request, response) -> {
            // Configura la configuración multipart en la solicitud
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

            try (InputStream is = request.raw().getPart("uploaded_file").getInputStream()) {
                // Directorio donde se guardará la imagen (ajusta según tus necesidades)
                String uploadDir = "assets";

                // Obtiene el nombre personalizado del archivo, si se proporcionó
                String customName = request.queryParams("custom_name");

                // Si no se proporcionó un nombre personalizado, utiliza el nombre original
                String submittedFileName = request.raw().getPart("uploaded_file").getSubmittedFileName();
                String fileName = (customName != null && !customName.isEmpty()) ? customName : submittedFileName;

                // Obtiene la extensión del archivo original (si existe)
                String fileExtension = "";
                Pattern pattern = Pattern.compile("\\.(\\w+)$");
                Matcher matcher = pattern.matcher(submittedFileName);
                if (matcher.find()) {
                    fileExtension = matcher.group(1);
                }

                // Si se proporcionó un nombre personalizado, agrega la extensión del archivo
                if (customName != null && !customName.isEmpty() && !customName.contains(".")) {
                    fileName = fileName + "." + fileExtension;
                }

                // Crea el directorio si no existe
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Ruta completa del archivo en el servidor
                String filePath = "C:\\Users\\Migue\\Desktop\\SCYGV\\SGV\\SCYGV\\src\\" + uploadDir + "\\" + fileName;

                // Guarda la imagen en el servidor
                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = is.read(buffer)) != -1) {
                        fos.write(buffer, 0, bytesRead);
                    }
                }

                return gson.toJson(new Respuesta("Imagen subida exitosamente. Nombre del archivo"));
            } catch (Exception e) {
                e.printStackTrace();
                response.status(500);
                return gson.toJson(new Respuesta("Error al subir imagen"));
            }
        });

        put("/upload/:id/:imageName", (req, res) -> {
            String id = req.params(":id");
            String imageName = req.params(":imageName");
            String ruta = "./assets";

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_USUARIOS SET FOTO = ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, ruta + "/" + imageName);
                statement.setString(2, id);
                int affectedRows = statement.executeUpdate();

                if (affectedRows > 0) {
                    return gson.toJson(new Respuesta("Ruta de imagen actualizada"));
                } else {
                    return gson.toJson(
                            new Respuesta("No se encontró un usuario con esa id"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al actualizar la imagen"));
            }
        }, gson::toJson);

        
    }
    

    

    //Devolver la fecha
      public static String devolverFecha(Date fechaEntrada) throws ParseException{ 
            SimpleDateFormat formato = new SimpleDateFormat("yyyy/MM/dd");// Convierte Date a String
            String miFecha = formato.format(fechaEntrada); // convierte String a Date
            return miFecha;
          }

    //Devolver dias correspondientes
    public static int devolverdias(int antiguedad){
        int dias = 0;
        if(antiguedad == 1){
            dias = 12;}
        else if(antiguedad == 2){
            dias = 14;}
        else if(antiguedad == 3){
            dias= 16;}
        else if(antiguedad == 4){
            dias= 18;}
        else if(antiguedad == 5){
            dias= 20;}
        else if(antiguedad >= 6 && antiguedad <= 10){
            dias= 22;}
        else if(antiguedad >= 11 && antiguedad <= 15){
            dias= 24;}
        else if(antiguedad >= 16 && antiguedad <= 20){
            dias= 26;}
        else if(antiguedad >= 21 && antiguedad <= 25){
            dias= 28;}
        else if(antiguedad >= 26 && antiguedad <= 30){
            dias= 30;}
        else if(antiguedad >= 31 && antiguedad <= 35){
            dias= 32;}
        return dias;
    }

    // Clase para representar login
    static class Login {
        private int id;
        private String rol;
        private String nombres;
        private String apellidos;

        public Login(int id, String rol, String nombres, String apellidos) {
            this.id = id;
            this.rol = rol;
            this.nombres = nombres;
            this.apellidos = apellidos;
        }

        public int getId() {
            return id;
        }

        public String getRol() {
            return rol;
        }
         public String getNombres() {
            return nombres;
        }
         public String getApellidos() {
            return apellidos;
        }
    }

    // Clase para representar un rol
    static class Rol {
        private int id;
        private String rol;

        public Rol(int id, String rol) {
            this.id = id;
            this.rol = rol;
        }

        public int getId() {
            return id;
        }

        public String getNombre() {
            return rol;
        }
    }

    // Clase para representar la respuesta JSON
    static class Respuesta {
        private String mensaje;

        public Respuesta(String mensaje) {
            this.mensaje = mensaje;
        }

        public String getMensaje() {
            return mensaje;
        }

    }

    // Clase para representar usuarios
    static class Usuarios {
        private int id;
        private String nombres;
        private String apellidos;
        private String contrasena;
        private String correo;
        private int rol;
        private String rfc;
        private String curp;
        private String n_c_prof;
        private String u_g_estudio;
        private String f_ingreso;
        private String especialidad;
        private String telefono;
        String foto;

        public Usuarios(int id, String nombres, String apellidos, String contrasena, String correo,
                int rol, String rfc, String curp, String n_c_prof, String u_g_estudio, String f_ingreso,
                String especialidad, String telefono, String foto) {
            this.id = id;
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.contrasena = contrasena;
            this.correo = correo;
            this.rol = rol;
            this.rfc = rfc;
            this.curp = curp;
            this.n_c_prof = n_c_prof;
            this.u_g_estudio = u_g_estudio;
            this.f_ingreso = f_ingreso;
            this.especialidad = especialidad;
            this.telefono = telefono;
            this.foto = foto;
        }

        public int getId() {
            return id;
        }

        public String getNombres() {
            return nombres;
        }

        public String getApellidos() {
            return apellidos;
        }

        public String getContrasena() {
            return contrasena;
        }

        public String getCorreo() {
            return correo;
        }

        public int getRol() {
            return rol;
        }

        public String getRFC() {
            return rfc;
        }

        public String getCurp() {
            return curp;
        }

        public String getNCProf() {
            return n_c_prof;
        }

        public String getUGEstudio() {
            return u_g_estudio;
        }

        public String getFIngreso() {
            return f_ingreso;
        }

        public String getEspecialidad() {
            return especialidad;
        }

        public String getTelefono() {
            return telefono;
        }
    }

    // Clase para representar un catalogo
    static class Catalogo {
        private String annios_lab;
        private int dias_vac;

        public Catalogo(String años_lab, int dias_vac) {
            this.annios_lab = años_lab;
            this.dias_vac = dias_vac;
        }

        public String getAñosLab() {
            return annios_lab;
        }

        public int getDiasVac() {
            return dias_vac;
        }
    }

    // Clase para representar solicitudes
    static class Solicitud {
        private int id;
        private int id_user;
        private String nombres;
        private String reviso;
        private String fecha;
        private String fecha_i;
        private String fecha_f;
        private String motivo;
        private int dias;
        private String estado;
        private String comentario;
        private String observaciones;

        public Solicitud(int id, int id_user, String nombres, String reviso, String fecha,String fecha_i,String fecha_f, String motivo, int dias, String estado, String comentario, String observaciones) {
            this.id = id;
            this.id_user = id_user;
            this.nombres = nombres;
            this.reviso = reviso;
            this.fecha = fecha;
            this.fecha_i = fecha_i;
            this.fecha_f = fecha_f;
            this.motivo = motivo;
            this.dias = dias;
            this.estado = estado;
            this.comentario = comentario;
            this.observaciones = observaciones;
        }

        public int getId() {
            return id;
        }

        public int getId_user() {
            return id_user;
        }

        public String getNombres() {
            return nombres;
        }

        public String getReviso() {
            return reviso;
        }

        public String getFecha() {
            return fecha;
        }

        public String getFecha_I() {
            return fecha_i;
        }

        public String getFecha_F() {
            return fecha_f;
        }

        public String getMotivo() {
            return motivo;
        }

        public int getDias() {
            return dias;
        }

        public String getComentario() {
            return comentario;
        }

         public String getObservaciones() {
            return observaciones;
        }

         public String getEstado() {
            return estado;
        }
    }
     // Clase para representar usuarios
    static class AntiguedadUsuario {
        private int id;
        private String nombres;
        private String apellidos;
        private String f_ingreso;
        private int anos_antiguedad;
        private int dias_vac_corres;
        private int dias_utilizados;
        private int dias_disponibles;

        public AntiguedadUsuario(int id, String nombres,String apellidos,String f_ingreso,int anos_antiguedad, int dias_vac_corres, int dias_utilizados, int dias_disponibles) {
            this.id = id;
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.f_ingreso = f_ingreso;
            this.anos_antiguedad = anos_antiguedad;
            this.dias_vac_corres = dias_vac_corres;
            this.dias_utilizados = dias_utilizados;
            this.dias_disponibles = dias_disponibles;
        }

        public int getId(){
            return id;
        }
        public String getNombres() {
            return nombres;
        }

        public String getApellidos() {
            return apellidos;
        }

        public String getFIngreso() {
            return f_ingreso;
        }

        public int getAntiUsuario() {
            return anos_antiguedad;
        }

        public int getDiasVacCorr(){
            return dias_vac_corres;
        }

        public int getDiasUtilizados(){
            return dias_utilizados;
        }

         public int getDiasDisponibles(){
            return dias_disponibles;
        }
    }



}
