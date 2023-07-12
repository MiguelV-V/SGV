package com.example;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.mindrot.jbcrypt.BCrypt;

public class CRUDServer {
    private static Map<String, String> database = new HashMap<>();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(3000), 0);
        server.createContext("/", new CRUDHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Servidor escuchando en el puerto 3000");
    }

    static class CRUDHandler implements HttpHandler {
        private final String dbUrl = "jdbc:mysql://localhost:3306/jossecurity";
        private final String dbUser = "root";
        private final String dbPassword = "";

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String requestMethod = exchange.getRequestMethod();

            if (requestMethod.equalsIgnoreCase("GET")) {
                handleGetRequest(exchange);
            }
        }

        private void handleGetRequest(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            String[] pathSegments = path.split("/");

            if (pathSegments.length >= 6) {
                String userAdmin = pathSegments[1];
                String contra = pathSegments[2];
                String instruccion = pathSegments[3];
                String arg1 = pathSegments[4];
                String arg2 = pathSegments[5];

                if (userAdmin.equals("user_admin")) {
                    boolean isAdminValid = validateAdmin(contra);
                    if (isAdminValid) {
                        if (instruccion.equals("insertar")) {
                            boolean isInserted = insertData(arg1, arg2);
                            if (isInserted) {
                                sendResponse(exchange, "Datos insertados");
                            } else {
                                sendResponse(exchange, "Fallo al insertar datos");
                            }
                        } else if (instruccion.equals("consultar")) {
                            String result = database.get(arg1);
                            if (result != null) {
                                sendResponse(exchange, result);
                            } else {
                                sendResponse(exchange, "Datos no encontrados");
                            }
                        } else {
                            sendResponse(exchange, "Instrucción invalido");
                        }
                    } else {
                        sendResponse(exchange, "Credenciales del administrador invalido");
                    }
                } else {
                    sendResponse(exchange, "Usuario invalido");
                }
            } else {
                sendResponse(exchange, "Petición invalida");
            }
        }

        private boolean validateAdmin(String contra) {
            try {
                Connection connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
                String query = "SELECT password FROM users WHERE email = ?";
                PreparedStatement statement = connection.prepareStatement(query);
                statement.setString(1, "user_admin");
                ResultSet resultSet = statement.executeQuery();

                if (resultSet.next()) {
                    String hashedPassword = resultSet.getString("password");
                    // Verificar la contraseña utilizando BCrypt
                    boolean isPasswordValid = BCrypt.checkpw(contra, hashedPassword);
                    return isPasswordValid;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return false;
        }

        private boolean insertData(String arg1, String arg2) {
            try {
                Connection connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
                String query = "INSERT INTO users (name, email) VALUES (?, ?)";
                PreparedStatement statement = connection.prepareStatement(query);
                statement.setString(1, arg1);
                statement.setString(2, arg2);
                int rowsAffected = statement.executeUpdate();

                return rowsAffected > 0;
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return false;
        }

        private void sendResponse(HttpExchange exchange, String response) throws IOException {
            exchange.sendResponseHeaders(200, response.length());
            OutputStream outputStream = exchange.getResponseBody();
            outputStream.write(response.getBytes());
            outputStream.flush();
            outputStream.close();
        }
    }
}
