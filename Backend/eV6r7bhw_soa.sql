-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-07-2023 a las 19:15:00
-- Versión del servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Versión de PHP: 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eV6r7bhw_soa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SCYGV_CATALOGO`
--

CREATE TABLE `SCYGV_CATALOGO` (
  `AÑOS_LAB` varchar(12) NOT NULL,
  `DIAS_VAC` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `SCYGV_CATALOGO`
--

INSERT INTO `SCYGV_CATALOGO` (`AÑOS_LAB`, `DIAS_VAC`) VALUES
('1', 12),
('2', 14),
('3', 16),
('4', 18),
('5', 20),
('De 11 a 15', 24),
('De 16 a 20', 26),
('De 21 a 25', 28),
('De 25 a 30', 30),
('De 31 a 35', 32),
('De 6 a 10', 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SCYGV_ROLES`
--

CREATE TABLE `SCYGV_ROLES` (
  `ID` int(11) NOT NULL,
  `ROL` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `SCYGV_ROLES`
--

INSERT INTO `SCYGV_ROLES` (`ID`, `ROL`) VALUES
(1, 'Admin'),
(2, 'RH'),
(3, 'Empleados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SCYGV_SOLICITUDES`
--

CREATE TABLE `SCYGV_SOLICITUDES` (
  `ID` bigint(21) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_RH` int(11) DEFAULT NULL,
  `FECHA` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `MOTIVO` text NOT NULL,
  `DIAS` int(11) NOT NULL,
  `ESTADO` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SCYGV_USUARIOS`
--

CREATE TABLE `SCYGV_USUARIOS` (
  `ID` int(11) NOT NULL,
  `NOMBRES` varchar(60) NOT NULL,
  `APELLIDOS` varchar(60) NOT NULL,
  `CONTRASEÑA` varchar(255) NOT NULL,
  `CORREO` varchar(160) NOT NULL,
  `ROL` int(11) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `CURP` varchar(18) NOT NULL,
  `N_C_PROF` varchar(10) NOT NULL,
  `U_G_ESTUDIO` varchar(20) NOT NULL,
  `F_INGRESO` date NOT NULL,
  `ESPECIALIDAD` varchar(10) NOT NULL,
  `TELEFONO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `SCYGV_CATALOGO`
--
ALTER TABLE `SCYGV_CATALOGO`
  ADD PRIMARY KEY (`AÑOS_LAB`);

--
-- Indices de la tabla `SCYGV_ROLES`
--
ALTER TABLE `SCYGV_ROLES`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `SCYGV_SOLICITUDES`
--
ALTER TABLE `SCYGV_SOLICITUDES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID_USER` (`ID_USER`),
  ADD UNIQUE KEY `ID_RH` (`ID_RH`);

--
-- Indices de la tabla `SCYGV_USUARIOS`
--
ALTER TABLE `SCYGV_USUARIOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ROL` (`ROL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `SCYGV_ROLES`
--
ALTER TABLE `SCYGV_ROLES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `SCYGV_SOLICITUDES`
--
ALTER TABLE `SCYGV_SOLICITUDES`
  MODIFY `ID` bigint(21) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `SCYGV_USUARIOS`
--
ALTER TABLE `SCYGV_USUARIOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `SCYGV_SOLICITUDES`
--
ALTER TABLE `SCYGV_SOLICITUDES`
  ADD CONSTRAINT `SCYGV_SOLICITUDES_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `SCYGV_USUARIOS` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SCYGV_SOLICITUDES_ibfk_2` FOREIGN KEY (`ID_RH`) REFERENCES `SCYGV_USUARIOS` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `SCYGV_USUARIOS`
--
ALTER TABLE `SCYGV_USUARIOS`
  ADD CONSTRAINT `SCYGV_USUARIOS_ibfk_1` FOREIGN KEY (`ROL`) REFERENCES `SCYGV_ROLES` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
