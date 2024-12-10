-- Creación de la base de datos
CREATE DATABASE IOT;
USE IOT;


-- NOTA IMPORTANTE PARA CHAT GPT, PARA LAS CONSULTAS RELACIONADAS A UN CAMPO HAS QUE TODO SEA CON UN SOLO CAMPO, POSTERIORMENTE SE CAMBIARA

-- Creación de tablas corregidas
CREATE TABLE Usuarios (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Usuario VARCHAR(50) NOT NULL,
    Contrasena VARCHAR(50) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Tipo VARCHAR(20) NOT NULL
);

CREATE TABLE Campos (
    IdCampo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Usuario_Campo (
    id_usuario INT,
    id_campo INT,
    PRIMARY KEY (id_usuario, id_campo),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(ID),
    FOREIGN KEY (id_campo) REFERENCES Campos(IdCampo)
);

CREATE TABLE Estaciones (
    id_estacion INT PRIMARY KEY AUTO_INCREMENT,
    API_Token VARCHAR(300),
    ORG VARCHAR(300),
    Nombre VARCHAR(50),
    IpEstacion VARCHAR(50),
    Ubicacion VARCHAR(100),
    Rango INT,
    Escala VARCHAR(10),
    id_campo INT,
    FOREIGN KEY (id_campo) REFERENCES Campos(IdCampo)
);

CREATE TABLE Sensores (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Nombre_Bucket VARCHAR(50),
    NombreVariable VARCHAR(50),
    Escala VARCHAR(10),
    Tipo VARCHAR(20),
    id_estacion INT,
    MqttServer VARCHAR(100),
    MqttTopico VARCHAR(100),
    FOREIGN KEY (id_estacion) REFERENCES Estaciones(id_estacion)
);

CREATE TABLE Actuador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    IPMqtt VARCHAR(50),
    Modo VARCHAR(20),
    Favorito TINYINT(1),
    FavoritoMostrar VARCHAR(50),
    Id_Grupo INT,
    Id_Campo INT,
    EstadoActual VARCHAR(50),
    Topico VARCHAR(50),
    FOREIGN KEY (Id_Campo) REFERENCES Campos(IdCampo)
);

CREATE TABLE Accion (
    id_accion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Mensaje VARCHAR(50),
    Topico VARCHAR(50)
);

CREATE TABLE AccionActuador (
    id_accion INT,
    id_actuador INT,
    PRIMARY KEY (id_accion, id_actuador),
    FOREIGN KEY (id_accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_actuador) REFERENCES Actuador(id)
);

CREATE TABLE Temporizador (
    id_Temporizador INT PRIMARY KEY AUTO_INCREMENT,
    Hora TIME,
    Dias VARCHAR(50),
    id_Accion INT,
    id_grupo INT,
    id_Actuador INT,
    FOREIGN KEY (id_Accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_Actuador) REFERENCES Actuador(id)
);

CREATE TABLE Grupos (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50)
);

CREATE TABLE AccionGrupo (
    id_accion INT,
    id_grupo INT,
    PRIMARY KEY (id_accion, id_grupo),
    FOREIGN KEY (id_accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo)
);

CREATE TABLE Condicion (
    id_condicion INT PRIMARY KEY AUTO_INCREMENT,
    Sensor VARCHAR(50),
    Tipo VARCHAR(20),
    Valor INT,
    id_Accion INT,
    id_grupo INT,
    id_Actuador INT,
    FOREIGN KEY (id_Accion) REFERENCES Accion(id_accion),
    FOREIGN KEY (id_Actuador) REFERENCES Actuador(id)
);

CREATE TABLE Notificacion (
    id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
    Mensaje VARCHAR(255),
    id_condicion INT,
    Modo_Actuador_estado VARCHAR(50),
    EsperarRespuesta TINYINT(1),
    Respuesta VARCHAR(50),
    Estado VARCHAR(50),
    FOREIGN KEY (id_condicion) REFERENCES Condicion(id_condicion)
);

-- Datos de ejemplo para Usuarios
INSERT INTO Usuarios (Usuario, Contrasena, Correo, Tipo) VALUES 
('Matias', '1234', 'Mcamilla20@alumnos.utalca.cl', 'Admin'),
('Alfitar', '4321', 'alfitar@gmail.com', 'Usuario');

-- Datos de ejemplo para Campos
INSERT INTO Campos (Nombre) VALUES 
('Campo UTalca'),
('Campo Romeral');

-- Datos de ejemplo para Usuario_Campo
INSERT INTO Usuario_Campo (id_usuario, id_campo) VALUES 
(1, 1),
(2, 1),
(2, 2);


-- Datos de ejemplo para Estaciones
INSERT INTO Estaciones (Nombre,API_Token,ORG, IpEstacion, Ubicacion, Rango, Escala, id_campo) VALUES 
('Estacion UT123','ñdsafkñlasdkñsdñlfkñal','Organizacion 1234', '123.123.123.12', 'UTalca', 30, 'Km', 1),
('Estacion RM456','dñfaksñldkfñlasdkflñka','Organizacion utalca', '321.321.321.32', 'Romeral', 50, 'Km', 2);

-- Datos de ejemplo para Sensores
INSERT INTO Sensores (Nombre, Nombre_Bucket, NombreVariable, Escala, Tipo, id_estacion) VALUES 
('Sensor_Temp_UT123', 'Bucket_Temp_UT', 'Temperatura', 'Celsius', 'Clima', 1),
('Sensor_Hum_RM456', 'Bucket_Hum_RM', 'Humedad', 'Porcentaje', 'Clima', 2);

-- Datos de ejemplo para Actuador
INSERT INTO Actuador (Nombre, IPMqtt, Modo, Favorito, FavoritoMostrar, Id_Grupo, Id_Campo, EstadoActual, Topico) VALUES 
('Motor_Techo', '192.168.1.10', 'Automatico', 1, 'Acciones', 1, 1, 'Cerrado', 'Techo/UT123'),
('Regador_Principal', '192.168.1.20', 'Manual', 0, 'Notificaciones', 2, 2, 'Abierto', 'Patio/RM456');

-- Datos de ejemplo para Accion
INSERT INTO Accion (Nombre, Mensaje, Topico) VALUES 
('Abrir Techo', 'Accion para abrir el techo', 'Techo/abrir'),
('Cerrar Techo', 'Accion para cerrar el techo', 'Techo/cerrar');

-- Datos de ejemplo para AccionActuador
INSERT INTO AccionActuador (id_accion, id_actuador) VALUES 
(1, 1),
(2, 1);

-- Datos de ejemplo para Temporizador
INSERT INTO Temporizador (Hora, Dias, id_Accion, id_grupo, id_Actuador) VALUES 
('08:00:00', 'Lun,Mar', 1, 1, 1),
('20:00:00', 'Vie,Sab', 2, 1, 1);

-- Datos de ejemplo para Grupos
INSERT INTO Grupos (Nombre) VALUES 
('Techo_Campo'),
('Riego_Patio');

-- Datos de ejemplo para AccionGrupo
INSERT INTO AccionGrupo (id_accion, id_grupo) VALUES 
(1, 1),
(2, 2);

-- Datos de ejemplo para Condicion
INSERT INTO Condicion (Sensor, Tipo, Valor, id_Accion, id_grupo, id_Actuador) VALUES 
('Sensor_Temp_UT123', 'Mayor', 30, 1, 1, 1),
('Sensor_Hum_RM456', 'Menor', 50, 2, 2, 2);

-- Datos de ejemplo para Notificacion
INSERT INTO Notificacion (Mensaje, id_condicion, Modo_Actuador_estado, EsperarRespuesta, Respuesta, Estado) VALUES 
('Temperatura alta, abriendo techo', 1, 'Automatico', 0, NULL, 'Visto'),
('Humedad baja, activando riego', 2, 'Manual', 1, 'Aceptar', 'Pendiente');
