const express = require("express");
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

// ------------- cors ----------------------
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// ------------- Conexion a la base de datos -------------
const pool = mysql.createPool({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'IOT',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// ------------- Conexion a base de datos online -----------------
// nombre - alfajorbasedatos
// usuario - alfajor
// contraseña - alfajor1234




// ------------- Inicial -------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public'));
});


// ------------ Usuarios ------------
app.post("/Login", (req, res) => {
  const { Correo, Contrasena } = req.body;

  const sql = `SELECT * FROM Usuarios WHERE Correo = ? AND Contrasena = ?`;
  pool.query(sql, [Correo, Contrasena], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Usuario incorrecto: "+err });
    }
    res.status(200).json({ Correo: results[0].Correo, Tipo: results[0].Tipo, Nombre: results[0].Nombre });
  });
});

// ------------ Estaciones ------------

// Obtener todas las estaciones
app.get("/Estaciones", (req, res) => {
  const sql = `SELECT * FROM Estaciones`;
  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener las estaciones" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron estaciones" });
    }
    res.status(200).json(results);
  });
});

// ------------ Campo (revisar) ------------

// Obtener todos los campos
app.get("/Campos", (req, res) => {
  const sql = `SELECT * FROM Campo`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Campo':", err.message);
      return res.status(500).json({ error: "Error al obtener los campos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron campos" });
    }
    res.status(200).json(results);
  });
});

// ------------ Usuario_Campo ------------

// Obtener todas las relaciones Usuario-Campo
app.get("/Usuario_Campo", (req, res) => {
  const sql = `SELECT * FROM Usuario_Campo`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Usuario_Campo':", err.message);
      return res.status(500).json({ error: "Error al obtener las relaciones Usuario-Campo" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron relaciones Usuario-Campo" });
    }
    res.status(200).json(results);
  });
});

// ------------ Sensores ------------

// Obtener todos los sensores
app.get("/Sensores", (req, res) => {
  const sql = `SELECT * FROM Sensores`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Sensores':", err.message);
      return res.status(500).json({ error: "Error al obtener los sensores" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron sensores" });
    }
    res.status(200).json(results);
  });
});

// ------------ Actuador ------------

// Obtener todos los actuadores
app.get("/Actuador", (req, res) => {
  const sql = `SELECT * FROM Actuador`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Actuador':", err.message);
      return res.status(500).json({ error: "Error al obtener los actuadores" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron actuadores" });
    }
    res.status(200).json(results);
  });
});

// ------------ Condicion ------------

// Obtener todas las condiciones
app.get("/Condicion", (req, res) => {
  const sql = `SELECT * FROM Condicion`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Condicion':", err.message);
      return res.status(500).json({ error: "Error al obtener las condiciones" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron condiciones" });
    }
    res.status(200).json(results);
  });
});

// ------------ Notificacion ------------

// Obtener todas las notificaciones
app.get("/Notificacion", (req, res) => {
  const sql = `SELECT * FROM Notificacion`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Notificacion':", err.message);
      return res.status(500).json({ error: "Error al obtener las notificaciones" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron notificaciones" });
    }
    res.status(200).json(results);
  });
});

// ------------ Accion ------------

// Obtener todas las acciones
app.get("/Accion", (req, res) => {
  const sql = `SELECT * FROM Accion`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Accion':", err.message);
      return res.status(500).json({ error: "Error al obtener las acciones" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron acciones" });
    }
    res.status(200).json(results);
  });
});

// ------------ AccionActuador ------------

// Obtener todas las relaciones acción-actuador
app.get("/AccionActuador", (req, res) => {
  const sql = `SELECT * FROM AccionActuador`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'AccionActuador':", err.message);
      return res.status(500).json({ error: "Error al obtener las relaciones acción-actuador" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron relaciones acción-actuador" });
    }
    res.status(200).json(results);
  });
});

// ------------ Temporizador ------------

// Obtener todos los temporizadores
app.get("/Temporizador", (req, res) => {
  const sql = `SELECT * FROM Temporizador`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Temporizador':", err.message);
      return res.status(500).json({ error: "Error al obtener los temporizadores" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron temporizadores" });
    }
    res.status(200).json(results);
  });
});

// ------------ Grupos ------------

// Obtener todos los grupos
app.get("/Grupos", (req, res) => {
  const sql = `SELECT * FROM Grupos`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'Grupos':", err.message);
      return res.status(500).json({ error: "Error al obtener los grupos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron grupos" });
    }
    res.status(200).json(results);
  });
});

// ------------ AccionGrupo ------------

// Obtener todas las relaciones entre Accion y Grupo
app.get("/AccionGrupo", (req, res) => {
  const sql = `SELECT * FROM AccionGrupo`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta para 'AccionGrupo':", err.message);
      return res.status(500).json({ error: "Error al obtener las relaciones acción-grupo" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No se encontraron relaciones acción-grupo" });
    }
    res.status(200).json(results);
  });
});

// ------------- Print del puerto -------------
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto: " + port);
});

