-- Create the database
CREATE DATABASE IOT;

-- Use the created database
USE IOT;

-- Create the user and grant privileges
CREATE USER 'alfajor'@'%' IDENTIFIED BY 'alfajor';
GRANT ALL PRIVILEGES ON *.* TO 'alfajor'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Creación de tablas

-- Tabla Usuarios
CREATE TABLE Usuarios (
    ID INT PRIMARY KEY,
    Usuario VARCHAR(50),
    Contrasena VARCHAR(50),
    Correo VARCHAR(100),
    Tipo VARCHAR(20)
);

-- Tabla Estaciones
CREATE TABLE Estaciones (
    id_estacion INT PRIMARY KEY,
    Nombre VARCHAR(50),
    IpEstacion VARCHAR(50),
    Ubicacion VARCHAR(100),
    Rango INT,
    Escala VARCHAR(10),
    id_campo INT
);

-- Tabla Campos
CREATE TABLE Campo (
    IdCampo INT PRIMARY KEY,
    Nombre VARCHAR(50)
);

-- Tabla Usuario_Campo
CREATE TABLE Usuario_Campo (
    id_usuario INT,
    id_campo INT,
    PRIMARY KEY (id_usuario, id_campo),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(ID),
    FOREIGN KEY (id_campo) REFERENCES Campo(IdCampo)
);

-- Tabla Sensores
CREATE TABLE Sensores (
    idSensor INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Nombre_Bucket VARCHAR(50),
    NombreVariable VARCHAR(50),
    Escala VARCHAR(10),
    Tipo VARCHAR(20),
    id_estacion INT,
    FOREIGN KEY (id_estacion) REFERENCES Estaciones(id_estacion)
);

-- Tabla Actuador
CREATE TABLE Actuador (
    id INT PRIMARY KEY,
    Nombre VARCHAR(50),
    IPMqtt VARCHAR(50),
    Modo VARCHAR(20),
    Favorito VARCHAR(2),
    FavoritoMostrar VARCHAR(50),
    Id_Grupo INT,
    Id_Campo INT,
    EstadoActual VARCHAR(50),
    Topico VARCHAR(50)
);

-- Tabla Condicion
CREATE TABLE Condicion (
    id_condicion INT PRIMARY KEY,
    Sensor VARCHAR(50),
    Tipo VARCHAR(20),
    Valor INT,
    id_Accion INT,
    id_grupo INT,
    id_Actuador INT
);

-- Tabla Notificacion
CREATE TABLE Notificacion (
    id_notificacion INT PRIMARY KEY,
    Mensaje VARCHAR(255),
    id_condicion INT, -- Relación con la tabla Condicion
    Modo_Actuador_estado VARCHAR(50),
    EsperarRespuesta VARCHAR(2),
    Respuesta VARCHAR(50),
    Estado VARCHAR(50),
    FOREIGN KEY (id_condicion) REFERENCES Condicion(id_condicion)
);



-- Tabla Accion
CREATE TABLE Accion (
    id_accion INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Mensaje VARCHAR(50),
    Topico VARCHAR(50),
    FOREIGN KEY (id_Actuador) REFERENCES Actuador(id)
);

-- Tabla AccionActuador
CREATE TABLE AccionActuador (
    id_accion INT,
    id_actuador INT,
    PRIMARY KEY (id_accion, id_actuador),
    FOREIGN KEY (id_accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_actuador) REFERENCES Actuador(id)
);

-- Tabla Temporizador
CREATE TABLE Temporizador (
    id_Temporizador INT PRIMARY KEY,
    Hora TIME,
    Dias VARCHAR(50),
    id_Accion INT,
    id_grupo INT,
    id_Actuador INT,
    FOREIGN KEY (id_Accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_Actuador) REFERENCES Actuador(id)
);

-- Tabla Grupos
CREATE TABLE Grupos (
    id_grupo INT PRIMARY KEY,
    Nombre VARCHAR(50)
);

-- Tabla AccionGrupo
CREATE TABLE AccionGrupo (
    id_accion INT,
    id_grupo INT,
    PRIMARY KEY (id_accion, id_grupo),
    FOREIGN KEY (id_accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo)
);


-- Datos de ejemplo para Usuarios
INSERT INTO Usuarios VALUES 
(1, 'Matias', '1234', 'Mcamilla20@alumnos.utalca.cl', 'Admin'),
(2, 'Alfitar', '4321', 'alfitar@gmail.com', 'Usuario');

-- Datos de ejemplo para Campos
INSERT INTO Campo VALUES 
(1, 'Campo uTal'),
(2, 'Campo romeral');

-- Datos de ejemplo para Estaciones
INSERT INTO Estaciones VALUES 
(1, 'Estacion D123', '123.123.123.12', 'Coordenadas', 30, 'Km', 1),
(2, 'Estacion D321', 'www.Link.cl', 'Coordenadas', 100, 'm', 2);

-- Datos de ejemplo para Usuario_Campo
INSERT INTO Usuario_Campo VALUES 
(1, 1),
(2, 1);

-- Datos de ejemplo para Sensores
INSERT INTO Sensores VALUES 
(1, 'Temperatura_D123', 'Datos_Sensor_D123', 'Temperatura', 'Celsius', 'Clima', 1),
(2, 'Humedad_D123', 'Datos_Sensor_D123', 'Humedad', 'Pascal', 'Clima', 1),
(3, 'Bateria_D123', 'Datos_Sensor_D123', 'Bateria', 'Volts', 'Estacion', 1);

-- Datos de ejemplo para Actuador
INSERT INTO Actuador VALUES 
(1, 'Motor1', '123.123.123.123', 'Automatico', 'No', 'Acciones', NULL, 1, 'Cerrado', 'Techo_123'),
(2, 'Regador', '321.321.321.312', 'Manual', 'Si', 'Notificaciones', 2, 1, 'Abierto', 'Patio_321');

-- Datos de ejemplo para Accion
INSERT INTO Accion VALUES 
(1, 'Abrir techo', 'O', 'topico1'),
(2, 'Cerrar techo', 'C', 'topico2');

-- Datos de ejemplo para AccionActuador
INSERT INTO AccionActuador VALUES 
(1, 1),
(2, 1);

-- Datos de ejemplo para Temporizador
INSERT INTO Temporizador VALUES 
(1, '23:00:00', 'Lun,Mar', 1, NULL, 1),
(2, '03:00:00', 'Vie,Jue', 2, NULL, 1);

-- Datos de ejemplo para Grupos
INSERT INTO Grupos VALUES 
(1, 'Techo_campo'),
(2, 'Patio_ciudad');

-- Datos de ejemplo para AccionGrupo
INSERT INTO AccionGrupo VALUES 
(1, 1),
(2, 2);

-- Datos de ejemplo para Condicion
INSERT INTO Condicion VALUES 
(1, 'Temperatura', 'Mayor', 50, 1, 1, NULL),
(2, 'Humedad', 'Menor', 14, 2, NULL, 2);

-- Datos de ejemplo para Notificacion
INSERT INTO Notificacion VALUES 
(1, 'Suelo seco', 1, 'SemiAutomatico', 'Si', 'Aceptar', 'Visto'),
(2, 'Mensaje personalizado', 2, 'Manual', 'No', NULL, 'No visto');

