-- Create the database
CREATE DATABASE inventario;

-- Use the created database
USE inventario;

-- Create the user and grant privileges
CREATE USER 'alfajor'@'%' IDENTIFIED BY 'alfajor';
GRANT ALL PRIVILEGES ON *.* TO 'alfajor'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Creación de tablas

CREATE TABLE Usuario (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre TEXT,
    Correo TEXT,
    Contraseña TEXT,
    Tipo TEXT
);


INSERT INTO Usuario (Nombre, Correo, Contraseña,Tipo) VALUES
('Matias Camilla','mcamilla20@alumnos.utalca.cl','12345678','administrador' ),
('Luckas Strnad', 'lstrnad20@alumnos.utalca.cl','12345678' ,'usuario'),
('Admin', 'admin','admin' ,'administrador'),
('usuario', 'usuario','usuario' ,'usuario');

