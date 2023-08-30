package com.example;

import static spark.Spark.*;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class CRUDServer {
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
                    Date f_ingreso = resultSet.getDate("f_ingreso");
                    String especialidad = resultSet.getString("especialidad");
                    String telefono = resultSet.getString("telefono");
                    usuarios.add(new Usuarios(id, nombres, apellidos, contrasena, correo, rol, rfc, curp,
                            n_c_prof, u_g_estudio, f_ingreso, especialidad, telefono));
                }
                return gson.toJson(usuarios);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener los usuarios"));
            }
        });

        // Ruta para crear un nuevo usuario
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
            Date f_ingreso = usuario.getFIngreso();
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
                statement.setDate(10, f_ingreso);
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
            Date f_ingreso = usuario.getFIngreso();
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
                statement.setDate(10, f_ingreso);
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
                    String contrasena = resultSet.getString("contrasena");
                    String correo = resultSet.getString("correo");
                    int rol = resultSet.getInt("rol");
                    String rfc = resultSet.getString("rfc");
                    String curp = resultSet.getString("curp");
                    String n_c_prof = resultSet.getString("n_c_prof");
                    String u_g_estudio = resultSet.getString("u_g_estudio");
                    Date f_ingreso = resultSet.getDate("f_ingreso");
                    String especialidad = resultSet.getString("especialidad");
                    String telefono = resultSet.getString("telefono");
                    usuarios.add(new Usuarios(Id, nombres, apellidos, contrasena, correo, rol, rfc, curp,
                            n_c_prof, u_g_estudio, f_ingreso, especialidad, telefono));
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
                String query = "SELECT * FROM SCYGV_CATALOGO";
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
        // OBTENER SOLICITUDES
        get("/solicitudes", (req, res) -> {
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES";
                PreparedStatement statement = conn.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    int id_rh = resultSet.getInt("id_rh");
                    Date fecha = resultSet.getDate("fecha");
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    solicitudes.add(new Solicitud(id, id_user, id_rh, fecha, motivo, dias, estado));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener las solicitudes"));
            }
        });

        // Ruta para crear un nuevo usuario
        post("/solicitudes", (req, res) -> {
            Solicitud solicitud = gson.fromJson(req.body(), Solicitud.class);
            int id_user = solicitud.getId_user();
            int id_rh = solicitud.getId_rh();
            Date fecha = solicitud.getFecha();
            String motivo = solicitud.getMotivo();
            int dias = solicitud.getDias();
            String estado = solicitud.getEstado();

            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "INSERT INTO SCYGV_SOLICITUDES (ID_USER, ID_RH, FECHA, MOTIVO, DIAS, ESTADO) VALUES (?,?,?,?,?,?);";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id_user);
                statement.setInt(2, id_rh);
                statement.setDate(3, fecha);
                statement.setString(4, motivo);
                statement.setInt(5, dias);
                statement.setString(6, estado);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Solicitud creada correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al crear la Solicitud"));
            }
        }, gson::toJson);

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

        // Ruta para modificar usuarios
        put("/solicitudes/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Solicitud solicitud = gson.fromJson(req.body(), Solicitud.class);
            int id_user = solicitud.getId_user();
            int id_rh = solicitud.getId_rh();
            Date fecha = solicitud.getFecha();
            String motivo = solicitud.getMotivo();
            int dias = solicitud.getDias();
            String estado = solicitud.getEstado();
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "UPDATE SCYGV_SOLICITUDES SET ID_USER = ?, ID_RH = ?, FECHA = ?, MOTIVO = ?, DIAS = ?, ESTADO = ? WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id_user);
                statement.setInt(2, id_rh);
                statement.setDate(3, fecha);
                statement.setString(4, motivo);
                statement.setInt(5, dias);
                statement.setString(6, estado);
                statement.setInt(7, id);
                statement.executeUpdate();

                return gson.toJson(new Respuesta("Se actualizo correctamente"));
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al actualizar"));
            }
        }, gson::toJson);

        // Ruta para obtener usuarios por id
        get("/solicitudes/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                String query = "SELECT * FROM SCYGV_SOLICITUDES WHERE ID = ?";
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setInt(1, id);
                ResultSet resultSet = statement.executeQuery();

                List<Solicitud> solicitudes = new ArrayList<>();
                while (resultSet.next()) {
                    int Id = resultSet.getInt("id");
                    int id_user = resultSet.getInt("id_user");
                    int id_rh = resultSet.getInt("id_rh");
                    Date fecha = resultSet.getDate("fecha");
                    String motivo = resultSet.getString("motivo");
                    int dias = resultSet.getInt("dias");
                    String estado = resultSet.getString("estado");
                    solicitudes.add(new Solicitud(Id, id_user, id_rh, fecha, motivo, dias, estado));
                }
                return gson.toJson(solicitudes);
            } catch (SQLException e) {
                e.printStackTrace();
                return gson.toJson(new Respuesta("Error al obtener la solicitud"));
            }
        });

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
                String respuesta;
                if(resultSet.next())
                {
                    int id = resultSet.getInt("ROL");
                    if(id > 0 && id < 4)
                    {
                        respuesta =  gson.toJson(true);
                    }
                    else{respuesta =  gson.toJson(false);}
                }
                else {
                  respuesta =  gson.toJson(false);
                }
                return respuesta;
            } catch (SQLException e) {
                return e;
            }
        });
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
        private Date f_ingreso;
        private String especialidad;
        private String telefono;

        public Usuarios(int id, String nombres, String apellidos, String contrasena, String correo,
                int rol, String rfc, String curp, String n_c_prof, String u_g_estudio, Date f_ingreso,
                String especialidad, String telefono) {
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

        public Date getFIngreso() {
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
        private int id_rh;
        private Date fecha;
        private String motivo;
        private int dias;
        private String estado;

        public Solicitud(int id, int id_user, int id_rh, Date fecha, String motivo, int dias, String estado) {
            this.id = id;
            this.id_user = id_user;
            this.id_rh = id_rh;
            this.fecha = fecha;
            this.motivo = motivo;
            this.dias = dias;
            this.estado = estado;
        }

        public int getId() {
            return id;
        }

        public int getId_user() {
            return id_user;
        }

        public int getId_rh() {
            return id_rh;
        }

        public Date getFecha() {
            return fecha;
        }

        public String getMotivo() {
            return motivo;
        }

        public int getDias() {
            return dias;
        }

        public String getEstado() {
            return estado;
        }
    }
}
