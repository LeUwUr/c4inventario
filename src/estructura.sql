CREATE TABLE `Articulo` (
  `Num_Referencia` varchar(30) NOT NULL,
  `NSerial` varchar(30) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Modelo` varchar(25) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Marca` tinyint(4) NOT NULL,
  `Resguardante` varchar(50) NOT NULL
);


CREATE TABLE `Art_Est` (
  `Estatus` tinyint(4) NOT NULL,
  `Num_Referencia` varchar(30) NOT NULL,
  `Comentario` varchar(200) NOT NULL,
  `Fecha` timestamp NULL DEFAULT NULL,
  `FechaConfirmacion` timestamp NULL DEFAULT NULL
);



CREATE TABLE `Art_Ubi` (
  `Numero` int(11) NOT NULL,
  `Ubicacion` tinyint(4) DEFAULT NULL,
  `Num_Referencia` varchar(30) DEFAULT NULL,
  `FechaEntrada` timestamp NOT NULL DEFAULT current_timestamp(),
  `FechaSalida` timestamp NULL DEFAULT NULL,
  `Comentario` varchar(200) NOT NULL,
  `Municipio` tinyint(4) NOT NULL
);


CREATE TABLE `Estatus_Articulo` (
  `Numero` tinyint(4) NOT NULL,
  `Estado` varchar(15) NOT NULL
);



INSERT INTO `Estatus_Articulo` (`Numero`, `Estado`) VALUES
(1, 'Activo'),
(2, 'Baja'),
(3, 'Baja Pendiente');


CREATE TABLE `Estatus_Reporte` (
  `Numero` int(11) NOT NULL,
  `Estado` varchar(10) NOT NULL
);

INSERT INTO `Estatus_Reporte` (`Numero`, `Estado`) VALUES
(1, 'Pendiente'),
(2, 'Revisado');



CREATE TABLE `Estatus_Usario` (
  `Numero` tinyint(4) NOT NULL,
  `Estado` varchar(10) NOT NULL
);

INSERT INTO `Estatus_Usario` (`Numero`, `Estado`) VALUES
(1, 'Activo'),
(2, 'Baja');


CREATE TABLE `Imagenes` (
  `Numero` int(11) NOT NULL,
  `Num_Referencia` varchar(30) NOT NULL,
  `NombreImagen` varchar(100) DEFAULT NULL
);

CREATE TABLE `Marca` (
  `Numero` tinyint(4) NOT NULL,
  `Nombre` varchar(25) NOT NULL
);



CREATE TABLE `Municipio` (
  `Numero` tinyint(4) NOT NULL,
  `Nombre` varchar(20) NOT NULL
);

INSERT INTO `Municipio` (`Numero`, `Nombre`) VALUES
(1, 'Playas de Rosarito'),
(2, 'Tijuana'),
(3, 'Tecate'),
(4, 'Ensenada'),
(5, 'Mexicali');

CREATE TABLE `Reporte` (
  `Numero` int(11) NOT NULL,
  `Accion` varchar(30) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `FechaAprobacion` timestamp NULL DEFAULT NULL,
  `Estatus` int(11) NOT NULL,
  `Usuario` int(11) NOT NULL,
  `Articulo` varchar(30) NOT NULL,
  `Ubicacion` tinyint(4) DEFAULT NULL,
  `Municipio` tinyint(4) NOT NULL,
  `Comentario` varchar(200) NOT NULL
);


CREATE TABLE `Rol` (
  `Numero` tinyint(4) NOT NULL,
  `Rol` varchar(15) NOT NULL
);


INSERT INTO `Rol` (`Numero`, `Rol`) VALUES
(1, 'Admin'),
(2, 'General'),
(3, 'Viewer');


CREATE TABLE `Ubicacion` (
  `Numero` tinyint(4) NOT NULL,
  `Lugar` varchar(25) NOT NULL
);


CREATE TABLE `Usr_Art` (
  `Usuario` int(11) NOT NULL,
  `Num_Referencia` varchar(30) NOT NULL
);


CREATE TABLE `Usuario` (
  `Numero` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `ApePat` varchar(20) NOT NULL,
  `Correo` varchar(30) NOT NULL,
  `Passwd` varchar(80) NOT NULL,
  `Rol` tinyint(4) NOT NULL,
  `Estado` tinyint(4) NOT NULL
);


ALTER TABLE `Articulo`
  ADD PRIMARY KEY (`Num_Referencia`),
  ADD KEY `FK_MarcaArt` (`Marca`);

/*Indexes for table `Art_Est`*/
ALTER TABLE `Art_Est`
  ADD PRIMARY KEY (`Estatus`,`Num_Referencia`),
  ADD KEY `FK_Est_Art` (`Num_Referencia`);

/*Indexes for table `Art_Ubi`*/
ALTER TABLE `Art_Ubi`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `FK_ArtUbi` (`Ubicacion`),
  ADD KEY `FK_UbiArt` (`Num_Referencia`),
  ADD KEY `FK_MunUbi` (`Municipio`);

/*Indexes for table `Estatus_Articulo`*/
ALTER TABLE `Estatus_Articulo`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Estatus_Reporte`*/
ALTER TABLE `Estatus_Reporte`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Estatus_Usario`*/
ALTER TABLE `Estatus_Usario`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Imagenes`*/
ALTER TABLE `Imagenes`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `FK_ImgArt` (`Num_Referencia`);

/*Indexes for table `Marca`*/
ALTER TABLE `Marca`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Municipio`*/
ALTER TABLE `Municipio`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Reporte`*/
ALTER TABLE `Reporte`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `FK_EstatusRep` (`Estatus`),
  ADD KEY `FK_UsuarioRep` (`Usuario`),
  ADD KEY `FK_ArtRep` (`Articulo`),
  ADD KEY `FK_UbiRep` (`Ubicacion`),
  ADD KEY `FK_MunRep` (`Municipio`);

/*Indexes for table `Rol`*/
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Ubicacion`*/
ALTER TABLE `Ubicacion`
  ADD PRIMARY KEY (`Numero`);

/*Indexes for table `Usr_Art`*/
ALTER TABLE `Usr_Art`
  ADD PRIMARY KEY (`Usuario`,`Num_Referencia`),
  ADD KEY `FK_ArtUsr` (`Num_Referencia`);

/*Indexes for table `Usuario`*/
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `FK_Rol` (`Rol`),
  ADD KEY `FK_EstadoUsr` (`Estado`);

/*AUTO_INCREMENT for dumped tables*/


/*AUTO_INCREMENT for table `Art_Ubi`*/
ALTER TABLE `Art_Ubi`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

/*AUTO_INCREMENT for table `Estatus_Articulo`*/
ALTER TABLE `Estatus_Articulo`
  MODIFY `Numero` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

/*AUTO_INCREMENT for table `Estatus_Reporte`*/
ALTER TABLE `Estatus_Reporte`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

/*AUTO_INCREMENT for table `Estatus_Usario`*/
ALTER TABLE `Estatus_Usario`
  MODIFY `Numero` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


/*AUTO_INCREMENT for table `Imagenes`*/
ALTER TABLE `Imagenes`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

/*AUTO_INCREMENT for table `Marca`*/
ALTER TABLE `Marca`
  MODIFY `Numero` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

/*AUTO_INCREMENT for table `Municipio`*/
ALTER TABLE `Municipio`
  MODIFY `Numero` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

/*AUTO_INCREMENT for table `Reporte`*/
ALTER TABLE `Reporte`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

/*AUTO_INCREMENT for table `Rol`*/
ALTER TABLE `Rol`
  MODIFY `Numero` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

/*AUTO_INCREMENT for table `Ubicacion`*/
ALTER TABLE `Ubicacion`
  MODIFY `Numero` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

/*AUTO_INCREMENT for table `Usuario`*/
ALTER TABLE `Usuario`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

/*Constraints for dumped tables*/

/*Constraints for table `Articulo`*/
ALTER TABLE `Articulo`
  ADD CONSTRAINT `FK_MarcaArt` FOREIGN KEY (`Marca`) REFERENCES `Marca` (`Numero`);

/*Constraints for table `Art_Est`*/
ALTER TABLE `Art_Est`
  ADD CONSTRAINT `FK_Art_Est` FOREIGN KEY (`Estatus`) REFERENCES `Estatus_Articulo` (`Numero`),
  ADD CONSTRAINT `FK_Est_Art` FOREIGN KEY (`Num_Referencia`) REFERENCES `Articulo` (`Num_Referencia`);

/*Constraints for table `Art_Ubi`*/
ALTER TABLE `Art_Ubi`
  ADD CONSTRAINT `FK_ArtUbi` FOREIGN KEY (`Ubicacion`) REFERENCES `Ubicacion` (`Numero`),
  ADD CONSTRAINT `FK_MunUbi` FOREIGN KEY (`Municipio`) REFERENCES `Municipio` (`Numero`),
  ADD CONSTRAINT `FK_UbiArt` FOREIGN KEY (`Num_Referencia`) REFERENCES `Articulo` (`Num_Referencia`);

/*Constraints for table `Imagenes`*/
ALTER TABLE `Imagenes`
  ADD CONSTRAINT `FK_ImgArt` FOREIGN KEY (`Num_Referencia`) REFERENCES `Articulo` (`Num_Referencia`);

/*Constraints for table `Reporte`*/
ALTER TABLE `Reporte`
  ADD CONSTRAINT `FK_ArtRep` FOREIGN KEY (`Articulo`) REFERENCES `Articulo` (`Num_Referencia`),
  ADD CONSTRAINT `FK_EstatusRep` FOREIGN KEY (`Estatus`) REFERENCES `Estatus_Reporte` (`Numero`),
  ADD CONSTRAINT `FK_MunRep` FOREIGN KEY (`Municipio`) REFERENCES `Municipio` (`Numero`),
  ADD CONSTRAINT `FK_UbiRep` FOREIGN KEY (`Ubicacion`) REFERENCES `Ubicacion` (`Numero`),
  ADD CONSTRAINT `FK_UsuarioRep` FOREIGN KEY (`Usuario`) REFERENCES `Usuario` (`Numero`);

/*Constraints for table `Usr_Art`*/
ALTER TABLE `Usr_Art`
  ADD CONSTRAINT `FK_ArtUsr` FOREIGN KEY (`Num_Referencia`) REFERENCES `Articulo` (`Num_Referencia`),
  ADD CONSTRAINT `FK_UsrArt` FOREIGN KEY (`Usuario`) REFERENCES `Usuario` (`Numero`);

/*Constraints for table `Usuario`*/
ALTER TABLE `Usuario`
  ADD CONSTRAINT `FK_EstadoUsr` FOREIGN KEY (`Estado`) REFERENCES `Estatus_Usario` (`Numero`),
  ADD CONSTRAINT `FK_Rol` FOREIGN KEY (`Rol`) REFERENCES `Rol` (`Numero`);