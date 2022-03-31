-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2022 a las 19:47:25
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laravel_proyecto4`
--
CREATE DATABASE IF NOT EXISTS `laravel_proyecto4` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `laravel_proyecto4`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_equipo`
--

CREATE TABLE `tbl_equipo` (
  `id_equipo` int(11) NOT NULL,
  `nombre_equipo` varchar(50) NOT NULL,
  `codigo_equipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_equipo`
--

INSERT INTO `tbl_equipo` (`id_equipo`, `nombre_equipo`, `codigo_equipo`) VALUES
(1, 'tete', '12345'),
(2, 'tetes', '1234'),
(3, 'tetitas', '1234'),
(4, 'qwerq', 'qrwerq');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_favorito`
--

CREATE TABLE `tbl_favorito` (
  `id_favorito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ubicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_favorito`
--

INSERT INTO `tbl_favorito` (`id_favorito`, `id_usuario`, `id_ubicacion`) VALUES
(4, 8, 15),
(5, 8, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_gimcana`
--

CREATE TABLE `tbl_gimcana` (
  `id_gimcana` int(11) NOT NULL,
  `nombre_gimcana` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_gimcana`
--

INSERT INTO `tbl_gimcana` (`id_gimcana`, `nombre_gimcana`) VALUES
(1, 'Gimcana Barrio Gotico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_pregunta`
--

CREATE TABLE `tbl_pregunta` (
  `id_pregunta` int(11) NOT NULL,
  `question_pregunta` varchar(255) NOT NULL,
  `respuestacorrecta_pregunta` varchar(255) NOT NULL,
  `respuestaincorrecta1_pregunta` varchar(255) NOT NULL,
  `respuestaincorrecta2_pregunta` varchar(255) NOT NULL,
  `respuestaincorrecta3_pregunta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_pregunta`
--

INSERT INTO `tbl_pregunta` (`id_pregunta`, `question_pregunta`, `respuestacorrecta_pregunta`, `respuestaincorrecta1_pregunta`, `respuestaincorrecta2_pregunta`, `respuestaincorrecta3_pregunta`) VALUES
(1, 'En el jardín de este edificio religioso, donde se encuentra el claustro, viven las 13 ocas blancas de Santa Eulalia, una por cada uno de los martirios que sufrió (tantos como años).', 'Catedral de Barcelona', 'Sagrada familia', 'Basílica de Santa Maria del Pi', 'Iglesia de la Concepción'),
(2, 'En la placa de esta pieza de arte pone: «El ruido de un beso no es tan ensordecedor como el de un cañón, pero su eco es más duradero»', '\"El petó\" de Joan Fontcuberta', '‘Barcino’ de Joan Brossa', '‘Mural de les Olles’ de Frederic Amat', '‘La dama del paraguas’ de Roig Soler'),
(3, 'Este palacio fue diseñado por Antoni Gaudí', 'Palacio Güell', 'Palacio de la Música Catalana', 'Museo de Arte Contemporáneo de Barcelona', 'Catedral de Barcelona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_puntocontrol`
--

CREATE TABLE `tbl_puntocontrol` (
  `id_puntocontrol` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `id_gimcana` int(11) NOT NULL,
  `id_ubicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_puntocontrol`
--

INSERT INTO `tbl_puntocontrol` (`id_puntocontrol`, `numero`, `id_pregunta`, `id_gimcana`, `id_ubicacion`) VALUES
(1, 1, 1, 1, 16),
(2, 2, 2, 1, 17),
(3, 3, 3, 1, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol`
--

CREATE TABLE `tbl_rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_rol`
--

INSERT INTO `tbl_rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'administrador'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tags`
--

CREATE TABLE `tbl_tags` (
  `id_tags` int(11) NOT NULL,
  `nombre_tags` varchar(50) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ubicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo`
--

CREATE TABLE `tbl_tipo` (
  `id_tipo` int(11) NOT NULL,
  `nombre_tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tipo`
--

INSERT INTO `tbl_tipo` (`id_tipo`, `nombre_tipo`) VALUES
(1, 'restaurante'),
(17, 'museo'),
(18, 'monumento'),
(19, 'teatro'),
(22, 'arte'),
(23, 'otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_ubicacion`
--

CREATE TABLE `tbl_ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `nombre_ubicacion` varchar(255) NOT NULL,
  `descripcion_ubicacion` varchar(255) NOT NULL,
  `direccion_ubicacion` varchar(255) NOT NULL,
  `foto_ubicacion` varchar(255) NOT NULL,
  `id_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_ubicacion`
--

INSERT INTO `tbl_ubicacion` (`id_ubicacion`, `nombre_ubicacion`, `descripcion_ubicacion`, `direccion_ubicacion`, `foto_ubicacion`, `id_tipo`) VALUES
(15, 'El Bosc de les Fades', 'Bar original donde se sirven bebidas y platos locales e internacionales, con una decoración ecléctica y un bosque artificial.', 'Passatge de la Banca, 7, 08002 Barcelona', 'uploads/2E7CocDf5EuvkSZUzCz2OBIqT3mI11v70H7oU8mV.jpg', 1),
(16, 'Catedral de Barcelona', 'Imponente catedral gótica con vistas a la ciudad y visitas guiadas; en uno de sus claustros viven ocas.', 'Pla de la Seu, s/n, 08002 Barcelona', 'uploads/zLmFdXfy0qe62K4Z8NHqfFzhOmmNkiN59IFBmlbY.jpg', 18),
(17, '\"El petó\" de Joan Fontcuberta', 'El mural del beso se trata de un bonito mosaico formado por más de 4.000 teselas de cerámica hechas con imágenes que enviaron los propios ciudadanos de Barcelona para la ocasión', 'Plaça d\'Isidre Nonell, 08002 Barcelona', 'uploads/mZILraOYAwoQLZ9DNEFS4L4kWZweQ5MvFpnZP1Ds.jpg', 22),
(18, 'Museo de Cera', 'Situado en la parte baja de la Rambla encontramos, en un edificio histórico de finales del siglo XIX, uno de los museos de cera más antiguos e importantes del mundo.', 'Passatge de la Banca, 7, 08002 Barcelona', 'uploads/VeP4h8eIDxyXgSZXjZRTjyxKKlOlAi81RjdLGINT.jpg', 17),
(19, 'Arume Restaurante', 'Platos típicos gallegos con un toque moderno en un restaurante sencillo y agradable.', 'Carrer d\'En Botella, 11, 13, 08001 Barcelona', 'uploads/FsezIEnQ5MAsDvajtP7KbSsD0yruweoe2AeC3Ed1.jpg', 1),
(20, 'Teatro Apolo', 'Obras dramáticas, comedias y musicales en la sala con mil butacas de un teatro emblemático inaugurado en 1904.', 'Av. del Paral·lel, 59, 08004 Barcelona', 'uploads/idLG39rbfBwSCCUexv8ASjEBlMxKU5PhQU3EzaKs.jpg', 19),
(21, 'Basílica de Santa Maria del Pi', 'Iglesia gótica situada en una plaza elegante con un gran rosetón y vistas desde el campanario.', 'Plaça del Pi, 7, 08002 Barcelona', 'uploads/KcF7l6iXwxXgy5oX52El9j3FoiLXDLvS2PQFfSyb.jpg', 18),
(22, 'Palacio Güell', 'Mansión modernista ricamente decorada, ejemplo emblemático de la arquitectura temprana de Gaudí.', 'Carrer Nou de la Rambla, 3-5, 08001 Barcelona', 'uploads/upRQbi7MSwvlWsZ2ibLhcbv1F7vt2LpzC6WphKmT.jpg', 18),
(23, 'Museu d\'Art Contemporani de Barcelona', 'Edificio blanco y luminoso que alberga obras desde 1940 hasta la fecha y una gran colección de arte catalán.', 'Plaça dels Àngels, 1, 08001 Barcelona', 'uploads/a4iU3m49Rth0r61wzwPkuMWVb3KWOTrLudlx7uYT.jpg', 17),
(24, 'Galeries Maldà', 'Lo que llama más la atención de estas galerías son sus tiendas temáticas, que nos llevan al universo Harry Potter, Bola de Dragón, Juego de Tronos y los establecimientos que venden cosas realmente únicas.', 'C/ de la Portaferrissa, 22, 08002 Barcelona', 'uploads/Zu5wfv3nTgRoA5zvcbVyMXSvYqkdKiqrBK13MI3H.jpg', 23),
(25, 'El Puente del Obispo', 'Puente de mármol entre 2 edificios del barrio Gótico, decorado con el relieve de una calavera atravesada por una daga.', 'C. del Bisbe, 08002 Barcelona', 'uploads/2V2vf7ZoLk2OuvTNLg3kDEkxZ26RhbcUz05y38Lf.jpg', 22),
(27, 'Mercado de La Boqueria', 'Concurrido mercado municipal cubierto, popular por sus puestos de carne, verduras, queso y otros alimentos.', 'La Rambla, 91, 08001 Barcelona', 'uploads/i1WYpdsWzlBC7HsbocJxROd6n2Yz3RBindS6Ngbp.jpg', 23),
(28, 'Teatro del Raval', 'Obras de diversas artes escénicas en un teatro de estilo romántico inaugurado en 1935 en un centro parroquial.', 'Carrer de Sant Antoni Abat, 12, 08001 Barcelona', 'uploads/GMg4kkkZygHB9ASdoyS4tpzLTYEKWjq5ssiZ0CED.jpg', 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(40) NOT NULL,
  `apellido_usuario` varchar(40) NOT NULL,
  `correo_usuario` varchar(100) NOT NULL,
  `password_usuario` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `correo_usuario`, `password_usuario`, `id_rol`) VALUES
(3, 'Gerard', 'Gomez', 'gerard@gomez.com', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(4, 'David', 'Alvarez', 'david@alvarez.com', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(5, 'David', 'Ortega', 'david@ortega.com', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(7, 'prueba', '1', 'prueba1@prueba1.com', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(8, 'prueba', '2', 'prueba2@prueba2.com', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(9, 'prueba', '3', 'prueba3@prueba3.com', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(10, 'prueba', '4', 'prueba4@prueba4.com', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(11, 'prueba', '5', 'prueba5@prueba5.com', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(12, 'prueba', '6', 'prueba6@prueba6.com', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(13, 'prueba', '7', 'prueba7@prueba7.com', '2e99bf4e42962410038bc6fa4ce40d97', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario_equipo`
--

CREATE TABLE `tbl_usuario_equipo` (
  `id_usuario_equipo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_usuario_equipo`
--

INSERT INTO `tbl_usuario_equipo` (`id_usuario_equipo`, `id_usuario`, `id_equipo`) VALUES
(1, 3, 3),
(2, 4, 3),
(3, 5, 3),
(4, 3, 4),
(5, 5, 4),
(6, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_validacion`
--

CREATE TABLE `tbl_validacion` (
  `id_validacion` int(11) NOT NULL,
  `check_validacion` int(1) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_puntocontrol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_equipo`
--
ALTER TABLE `tbl_equipo`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `tbl_favorito`
--
ALTER TABLE `tbl_favorito`
  ADD PRIMARY KEY (`id_favorito`),
  ADD KEY `fk_favorito_usuario` (`id_usuario`),
  ADD KEY `fk_favorito_ubicacion` (`id_ubicacion`);

--
-- Indices de la tabla `tbl_gimcana`
--
ALTER TABLE `tbl_gimcana`
  ADD PRIMARY KEY (`id_gimcana`);

--
-- Indices de la tabla `tbl_pregunta`
--
ALTER TABLE `tbl_pregunta`
  ADD PRIMARY KEY (`id_pregunta`);

--
-- Indices de la tabla `tbl_puntocontrol`
--
ALTER TABLE `tbl_puntocontrol`
  ADD PRIMARY KEY (`id_puntocontrol`),
  ADD KEY `fk_puntocontrol_pregunta` (`id_pregunta`),
  ADD KEY `fk_puntocontrol_gimcana` (`id_gimcana`),
  ADD KEY `fk_puntocontrol_ubicacion` (`id_ubicacion`);

--
-- Indices de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tbl_tags`
--
ALTER TABLE `tbl_tags`
  ADD PRIMARY KEY (`id_tags`),
  ADD KEY `fk_tags_usuario` (`id_usuario`),
  ADD KEY `fk_tags_ubicacion` (`id_ubicacion`);

--
-- Indices de la tabla `tbl_tipo`
--
ALTER TABLE `tbl_tipo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `tbl_ubicacion`
--
ALTER TABLE `tbl_ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`),
  ADD KEY `fk_ubicacion_tipo` (`id_tipo`);

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_rol` (`id_rol`);

--
-- Indices de la tabla `tbl_usuario_equipo`
--
ALTER TABLE `tbl_usuario_equipo`
  ADD PRIMARY KEY (`id_usuario_equipo`),
  ADD KEY `fk_usuarioequipo_usuario` (`id_usuario`),
  ADD KEY `fk_usuarioequipo_equipo` (`id_equipo`);

--
-- Indices de la tabla `tbl_validacion`
--
ALTER TABLE `tbl_validacion`
  ADD PRIMARY KEY (`id_validacion`),
  ADD KEY `fk_validacion_usuario` (`id_usuario`),
  ADD KEY `fk_validacion_puntocontrol` (`id_puntocontrol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_equipo`
--
ALTER TABLE `tbl_equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_favorito`
--
ALTER TABLE `tbl_favorito`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_gimcana`
--
ALTER TABLE `tbl_gimcana`
  MODIFY `id_gimcana` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_pregunta`
--
ALTER TABLE `tbl_pregunta`
  MODIFY `id_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_puntocontrol`
--
ALTER TABLE `tbl_puntocontrol`
  MODIFY `id_puntocontrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_tags`
--
ALTER TABLE `tbl_tags`
  MODIFY `id_tags` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_tipo`
--
ALTER TABLE `tbl_tipo`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `tbl_ubicacion`
--
ALTER TABLE `tbl_ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tbl_usuario_equipo`
--
ALTER TABLE `tbl_usuario_equipo`
  MODIFY `id_usuario_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_validacion`
--
ALTER TABLE `tbl_validacion`
  MODIFY `id_validacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_favorito`
--
ALTER TABLE `tbl_favorito`
  ADD CONSTRAINT `fk_favorito_ubicacion` FOREIGN KEY (`id_ubicacion`) REFERENCES `tbl_ubicacion` (`id_ubicacion`),
  ADD CONSTRAINT `fk_favorito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`);

--
-- Filtros para la tabla `tbl_puntocontrol`
--
ALTER TABLE `tbl_puntocontrol`
  ADD CONSTRAINT `fk_puntocontrol_gimcana` FOREIGN KEY (`id_gimcana`) REFERENCES `tbl_gimcana` (`id_gimcana`),
  ADD CONSTRAINT `fk_puntocontrol_pregunta` FOREIGN KEY (`id_pregunta`) REFERENCES `tbl_pregunta` (`id_pregunta`),
  ADD CONSTRAINT `fk_puntocontrol_ubicacion` FOREIGN KEY (`id_ubicacion`) REFERENCES `tbl_ubicacion` (`id_ubicacion`);

--
-- Filtros para la tabla `tbl_tags`
--
ALTER TABLE `tbl_tags`
  ADD CONSTRAINT `fk_tags_ubicacion` FOREIGN KEY (`id_ubicacion`) REFERENCES `tbl_ubicacion` (`id_ubicacion`),
  ADD CONSTRAINT `fk_tags_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`);

--
-- Filtros para la tabla `tbl_ubicacion`
--
ALTER TABLE `tbl_ubicacion`
  ADD CONSTRAINT `fk_ubicacion_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tbl_tipo` (`id_tipo`);

--
-- Filtros para la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `tbl_rol` (`id_rol`);

--
-- Filtros para la tabla `tbl_usuario_equipo`
--
ALTER TABLE `tbl_usuario_equipo`
  ADD CONSTRAINT `fk_usuarioequipo_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `tbl_equipo` (`id_equipo`),
  ADD CONSTRAINT `fk_usuarioequipo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`);

--
-- Filtros para la tabla `tbl_validacion`
--
ALTER TABLE `tbl_validacion`
  ADD CONSTRAINT `fk_validacion_puntocontrol` FOREIGN KEY (`id_puntocontrol`) REFERENCES `tbl_puntocontrol` (`id_puntocontrol`),
  ADD CONSTRAINT `fk_validacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
