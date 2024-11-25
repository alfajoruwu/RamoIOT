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
  user: 'alfajor',
  password: 'alfajor',
  database: 'inventario',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// ------------- Inicial -------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public'));
});


// ------------ Usuarios ------------
app.post("/Login", (req, res) => {
  const { Correo, Contrasena } = req.body;

  const sql = `SELECT * FROM Usuario WHERE Correo = ? AND Contraseña = ?`;
  pool.query(sql, [Correo, Contrasena], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Usuario incorrecto" });
    }
    res.status(200).json({ Correo: results[0].Correo, Tipo: results[0].Tipo, Nombre: results[0].Nombre });
  });
});


// ------------- Print del puerto -------------
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto: " + port);
});

