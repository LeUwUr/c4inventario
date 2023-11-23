create table Ubicacion(
    Numero tinyint primary key auto_increment,
    Lugar varchar(25) not null
);

create table Estatus_Articulo(
    Numero tinyint primary key auto_increment,
    Estado varchar(50) not null

);

create table Rol(
    Numero tinyint primary key auto_increment,
    Rol varchar(20) not null
);

create table Estatus_Reporte(
    Numero int primary key auto_increment,
    Estado varchar(50) not null
);

create table Usuario(
    Numero int primary key auto_increment,
    Nombre varchar(30) not null,
    ApePat varchar(20) not null,
    Correo varchar(30) not null,
    Passwd varchar(80) not null,
    Rol tinyint not null
);

ALTER TABLE Usuario
ADD CONSTRAINT FK_Rol FOREIGN KEY (Rol) REFERENCES Rol (Numero);

create table Marca(
    Numero tinyint primary key auto_increment,
    Nombre varchar(25) not null
);

/* Crear campo para la imagen*/
create table Articulo(
    Num_Referencia varchar(30) primary key,
    Nombre varchar(30) not null,
    Modelo varchar(25) not null,
    Color varchar(20) not null,
    Descripcion varchar(100) not null,
    FechaCreacion timestamp default current_timestamp,
    Marca tinyint not null
);

/* Agregar una connection a artiuculo */
Create table Reporte(
    Numero int primary key auto_increment,
    Accion varchar(30) not null,
    FechaCreacion timestamp default current_timestamp,
    FechaAprobacion timestamp,
    Estatus int not null,
    Usuario int not null,
    Articulo varchar(30) not null
);

ALTER TABLE Reporte
ADD CONSTRAINT FK_EstatusRep FOREIGN KEY (Estatus) REFERENCES Estatus_Reporte (Numero);

ALTER TABLE Reporte
ADD CONSTRAINT FK_UsuarioRep FOREIGN KEY (Usuario) REFERENCES Usuario (Numero);

ALTER TABLE Reporte
ADD CONSTRAINT FK_ArtRep FOREIGN KEY (Articulo) REFERENCES Articulo (Num_Referencia);



ALTER TABLE Articulo
ADD CONSTRAINT FK_MarcaArt FOREIGN KEY (Marca) REFERENCES Marca (Numero);

create table Usr_Art(
    Usuario int,
    Num_Referencia varchar(30)
);

ALTER TABLE Usr_Art
ADD CONSTRAINT PK_UsrArt primary KEY (Usuario,Num_Referencia);

ALTER TABLE Usr_Art
ADD CONSTRAINT FK_UsrArt FOREIGN KEY (Usuario) REFERENCES Usuario (Numero);

ALTER TABLE Usr_Art
ADD CONSTRAINT FK_ArtUsr FOREIGN KEY (Num_Referencia) REFERENCES Articulo (Num_Referencia);

create table Art_Ubi(
    Numero int primary key auto_increment,
    Ubicacion tinyint,
    Num_Referencia varchar(30),
    FechaEntrada timestamp default current_timestamp,
    FechaSalida timestamp null,
    Comentario varchar(200) not null
);

ALTER TABLE Art_Ubi
ADD CONSTRAINT FK_ArtUbi FOREIGN KEY (Ubicacion) REFERENCES Ubicacion (Numero);

ALTER TABLE Art_Ubi
ADD CONSTRAINT FK_UbiArt FOREIGN KEY (Num_Referencia) REFERENCES Articulo (Num_Referencia);

create table Art_Est(
    Estatus tinyint,
    Num_Referencia varchar(30),
    Comentario varchar(200) not null
);

ALTER TABLE Art_Est
ADD CONSTRAINT PK_Art_Est primary KEY (Estatus,Num_Referencia);

ALTER TABLE Art_Est
ADD CONSTRAINT FK_Art_Est FOREIGN KEY (Estatus) REFERENCES Estatus_Articulo (Numero);

ALTER TABLE Art_Est
ADD CONSTRAINT FK_Est_Art FOREIGN KEY (Num_Referencia) REFERENCES Articulo (Num_Referencia);

/* TRIGGERS: Add the default status to a new item */

DELIMITER //
CREATE TRIGGER setStatus
AFTER INSERT ON Articulo
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT * FROM Art_Est WHERE Num_Referencia = NEW.Num_Referencia) THEN
        INSERT INTO Art_Est (Estatus, Num_Referencia, Comentario)
        VALUES (1, NEW.Num_Referencia, 'Articulo recién añadido');
    END IF;
END;
//
DELIMITER ;


/* Insert data into Ubicacion table */
INSERT INTO Ubicacion (Numero, Lugar) VALUES
(1, 'Almacén A'),
(2, 'Almacén B'),
(3, 'Almacén C'),
(4, 'Almacén D'),
(5, 'Almacén E'),
(6, 'Almacén F'),
(7, 'Almacén G'),
(8, 'Almacén H'),
(9, 'Almacén I'),
(10, 'Almacén J');

/* Insert data into Estatus_Articulo table */
INSERT INTO Estatus_Articulo (Numero, Estado) VALUES
(1, 'Disponible'),
(2, 'En Reparación'),
(3, 'En Mantenimiento'),
(4, 'En Uso'),
(5, 'Dañado'),
(6, 'Reservado'),
(7, 'Perdido'),
(8, 'Reciclado'),
(9, 'En Stock'),
(10, 'Fuera de Servicio');

/* Insert data into Rol table */
INSERT INTO Rol (Numero, Rol) VALUES
(1, 'Admin'),
(2, 'Usuario Estándar'),
(3, 'Supervisor'),
(4, 'Técnico'),
(5, 'Invitado'),
(6, 'Analista'),
(7, 'Gerente'),
(8, 'Operador'),
(9, 'Desarrollador'),
(10, 'Diseñador');

/* Insert data into Estatus_Reporte table */
INSERT INTO Estatus_Reporte (Numero, Estado) VALUES
(1, 'Pendiente'),
(2, 'Aprobado'),
(3, 'Rechazado'),
(4, 'En Proceso'),
(5, 'Completado'),
(6, 'Cerrado'),
(7, 'Anulado'),
(8, 'Esperando Aprobación'),
(9, 'En Revisión'),
(10, 'Suspendido');

/*Insert data into Usuario table*/
INSERT INTO Usuario (Numero, Nombre, ApePat, Correo, Passwd, Rol) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'password123', 2),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'securepass', 2),
(3, 'Carlos', 'Gomez', 'carlos.gomez@example.com', 'mypassword', 3),
(4, 'Ana', 'Perez', 'ana.perez@example.com', 'pass123', 4),
(5, 'David', 'Johnson', 'david.johnson@example.com', 'testpass', 5),
(6, 'Elena', 'Rodriguez', 'elena.rodriguez@example.com', 'password456', 6),
(7, 'Francisco', 'Martinez', 'francisco.martinez@example.com', 'myp@ssword', 7),
(8, 'Gabriela', 'Lopez', 'gabriela.lopez@example.com', 'securepassword', 8),
(9, 'Hector', 'Ramirez', 'hector.ramirez@example.com', 'password789', 9),
(10, 'Isabel', 'Santos', 'isabel.santos@example.com', 'newpassword', 10);

/* Insert data into Marca table*/
INSERT INTO Marca (Numero, Nombre) VALUES
(1, 'Brand1'),
(2, 'Brand2'),
(3, 'Brand3'),
(4, 'Brand4'),
(5, 'Brand5'),
(6, 'Brand6'),
(7, 'Brand7'),
(8, 'Brand8'),
(9, 'Brand9'),
(10, 'Brand10');

/* Insert data into Articulo table*/
INSERT INTO Articulo (Num_Referencia, Nombre, Modelo, Color, Descripcion, Marca) VALUES
('A123', 'Item1', 'ModelX', 'Red', 'Description1', 1),
('A124', 'Item2', 'ModelY', 'Blue', 'Description2', 2),
('A125', 'Item3', 'ModelZ', 'Green', 'Description3', 3),
('A126', 'Item4', 'ModelA', 'Yellow', 'Description4', 4),
('A127', 'Item5', 'ModelB', 'Orange', 'Description5', 5),
('A128', 'Item6', 'ModelC', 'Purple', 'Description6', 6),
('A129', 'Item7', 'ModelD', 'Pink', 'Description7', 7),
('A130', 'Item8', 'ModelE', 'Brown', 'Description8', 8),
('A131', 'Item9', 'ModelF', 'Black', 'Description9', 9),
('A132', 'Item10', 'ModelG', 'White', 'Description10', 10);

/*Insert data into Reporte table*/
INSERT INTO Reporte (Numero, Accion, Estatus, Usuario, Articulo) VALUES
(1, 'Reparación', 1, 1, 'A123'),
(2, 'Mantenimiento', 1, 2, 'A124'),
(3, 'Inspección', 2, 3, 'A125'),
(4, 'Limpieza', 2, 4, 'A126'),
(5, 'Prueba', 3, 5, 'A127'),
(6, 'Cambio de Piezas', 3, 6, 'A128'),
(7, 'Actualización de Software', 4, 7, 'A129'),
(8, 'Reemplazo', 4, 8, 'A130'),
(9, 'Verificación', 5, 9, 'A131'),
(10, 'Calibración', 5, 10, 'A132');

/* Insert data into Usr_Art table */
INSERT INTO Usr_Art (Usuario, Num_Referencia) VALUES
(1, 'A123'),
(2, 'A124'),
(3, 'A125'),
(4, 'A126'),
(5, 'A127'),
(6, 'A128'),
(7, 'A129'),
(8, 'A130'),
(9, 'A131'),
(10, 'A132');

/* Insert data into Art_Ubi table */
INSERT INTO Art_Ubi (Numero, Ubicacion, Num_Referencia, FechaEntrada, Comentario) VALUES
(1, 1, 'A123', CURRENT_TIMESTAMP, 'En almacén A'),
(2, 2, 'A124', CURRENT_TIMESTAMP, 'En almacén B'),
(3, 3, 'A125', CURRENT_TIMESTAMP, 'En almacén C'),
(4, 4, 'A126', CURRENT_TIMESTAMP, 'En almacén D'),
(5, 5, 'A127', CURRENT_TIMESTAMP, 'En almacén E'),
(6, 6, 'A128', CURRENT_TIMESTAMP, 'En almacén F'),
(7, 7, 'A129', CURRENT_TIMESTAMP, 'En almacén G'),
(8, 8, 'A130', CURRENT_TIMESTAMP, 'En almacén H'),
(9, 9, 'A131', CURRENT_TIMESTAMP, 'En almacén I'),
(10, 10, 'A132', CURRENT_TIMESTAMP, 'En almacén J');
