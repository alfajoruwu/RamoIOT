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
// const pool = mysql.createPool({
//   host: 'db',
//   user: 'root',
//   password: 'example',
//   database: 'IOT',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });


// ------------- Conexion a base de datos online -----------------
// nombre - alfajorbasedatos
// usuario - alfajor
// contraseña - alfajor1234

const pool = mysql.createPool({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10750382',
  password: '43ZKBBRk6k',
  database: 'sql10750382',
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

  const sql = `SELECT * FROM Usuarios WHERE Correo = ? AND Contrasena = ?`;
  pool.query(sql, [Correo, Contrasena], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Usuario incorrecto: "+err });
    }
    res.status(200).json({Id: results[0].ID  ,Correo: results[0].Correo, Tipo: results[0].Tipo, Nombre: results[0].Nombre });
  });
});

// ------------ Estaciones ------------



app.get('/EstacionesPorUsuario/:id_usuario', (req, res) => {
  const { id_usuario } = req.params; // Obtén el id del usuario desde los params

  if (!id_usuario) {
    return res.status(400).json({ error: 'El parámetro id_usuario es obligatorio.' });
  }

  const query = `
    SELECT 
      e.id_estacion AS id,
      e.Nombre
    FROM 
      Estaciones e
    JOIN 
      Campos c ON e.id_campo = c.IdCampo
    JOIN 
      Usuario_Campo uc ON uc.id_campo = c.IdCampo
    WHERE 
      uc.id_usuario = ?;
  `;

  pool.query(query, [id_usuario], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    res.json(results);
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

app.get('/SensoresPorEstacion/:idEstacion', (req, res) => {
  const { idEstacion } = req.params; // Obtén el id de la estación desde los params

  if (!idEstacion) {
    return res.status(400).json({ error: 'El parámetro idEstacion es obligatorio.' });
  }

  const query = `
    SELECT 
      s.idSensor AS id,
      s.Nombre
    FROM 
      Sensores s
    WHERE 
      s.id_estacion = ?;
  `;

  pool.query(query, [idEstacion], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    res.json(results);
  });
});


// ------------ ObtenerEstadoActuador ------------

app.get('/ObtenerEstadoActuador/:idActuador', (req, res) => {
  const { idActuador } = req.params;

  if (!idActuador) {
    return res.status(400).json({ error: 'El parámetro idActuador es obligatorio.' });
  }

  // Consulta SQL corregida para obtener las acciones, el modo actual y la notificación
  const query = `
    SELECT 
      A.id_accion AS idAccion, 
      A.Nombre AS NombreAccion,
      AC.Modo AS ModoActual,
      IFNULL(N.Mensaje, 'No') AS Notificacion
    FROM Actuador AC
    LEFT JOIN AccionActuador AA ON AC.id = AA.id_actuador
    LEFT JOIN Accion A ON AA.id_accion = A.id_accion
    LEFT JOIN Condicion C ON C.id_Actuador = AC.id
    LEFT JOIN Notificacion N ON N.id_condicion = C.id_condicion
    WHERE AC.id = ?
  `;

  pool.query(query, [idActuador], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en la consulta de MySQL.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Actuador no encontrado.' });
    }

    // Filtrar las acciones asociadas al actuador
    const acciones = results.map(result => ({
      id: result.idAccion,
      NombreAccion: result.NombreAccion
    }));

    // Obtener el modo actual y la notificación (asumido que es el mismo para todas las acciones)
    const modoActual = results[0].ModoActual;
    const notificacion = results[0].Notificacion;

    // Respuesta final
    res.json({
      Acciones: acciones,
      ModoActual: modoActual,
      Notificacion: notificacion
    });
  });
});


// ------------ EjecutarAccionActuador ------------

app.post('/EjecutarAccionActuador', (req, res) => {
  const { idEstacion, idAccion } = req.body;

  // Validar los parámetros requeridos
  if (!idEstacion || !idAccion) {
    return res.status(400).json({ error: 'Faltan parámetros: idEstacion o idAccion.' });
  }

  // Consulta para obtener el actuador correspondiente a la estación y la acción
  const query = `
    SELECT AC.id AS idActuador, AC.Nombre AS NombreActuador, A.Nombre AS NombreAccion, AC.Modo
    FROM Actuador AC
    JOIN AccionActuador AA ON AC.id = AA.id_actuador
    JOIN Accion A ON AA.id_accion = A.id_accion
    JOIN Estaciones E ON E.id_estacion = ?
    WHERE A.id_accion = ?;
  `;

  pool.query(query, [idEstacion, idAccion], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en la consulta de MySQL.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontró el actuador o la acción para esta estación.' });
    }

    // Aquí podrías agregar la lógica para ejecutar la acción en el actuador (como interactuar con el hardware o enviarlo a un sistema MQTT, por ejemplo)

    const actuador = results[0];
    const modoActuador = actuador.Modo;

    // Respuesta de éxito
    res.json({
      mensaje: `Acción '${actuador.NombreAccion}' ejecutada en el actuador '${actuador.NombreActuador}' con modo '${modoActuador}'`,
      actuador: actuador.NombreActuador,
      accion: actuador.NombreAccion,
      modo: modoActuador
    });
  });
});

// ------------ ObtenerCondicionesActuador ------------

app.get('/ObtenerCondicionesActuador/:idActuador', (req, res) => {
  const { idActuador } = req.params;

  // Validar el idActuador
  if (!idActuador) {
    return res.status(400).json({ error: 'Falta el parámetro idActuador.' });
  }

  // Consulta SQL para obtener las condiciones del actuador
  const query = `
    SELECT 
      C.id_condicion AS id,
      C.Sensor,
      CONCAT(C.Tipo, ' ', C.Valor, ' ', 
        CASE 
          WHEN C.Tipo = 'Mayor' THEN 'grados'
          WHEN C.Tipo = 'Menor' THEN 'grados'
          ELSE 'Porcentaje'
        END) AS condicion,
      A.Nombre AS accion
    FROM Condicion C
    JOIN Actuador AC ON AC.id = C.id_Actuador
    JOIN Accion A ON A.id_accion = C.id_Accion
    WHERE AC.id = ?
  `;

  pool.query(query, [idActuador], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en la consulta de MySQL.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontraron condiciones para el actuador especificado.' });
    }

    // Respuesta con las condiciones encontradas
    res.json(results);
  });
});

// ------------ Añadir condición sensor ------------

app.post('/AnadirCondicionSensor', (req, res) => {
  const { id, Variable, tipo, valor, accionID, actuadorID } = req.body;

  // Validación de datos
  if (!id || !Variable || !tipo || !valor || !accionID || !actuadorID) {
    return res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud.' });
  }

  // Consulta SQL para insertar la nueva condición
  const query = `
    INSERT INTO Condicion (Sensor, Tipo, Valor, id_Accion, id_Actuador)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Variables que se pasan a la consulta SQL
  const sensor = `Sensor_${Variable}_${id}`; // Formato del nombre del sensor: Sensor_Variable_Id
  const tipoCondicion = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase(); // Asegura que el tipo esté correctamente capitalizado

  // Ejecutar la consulta
  pool.query(query, [sensor, tipoCondicion, valor, accionID, actuadorID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al añadir la condición en la base de datos.' });
    }

    // Respuesta exitosa
    res.json({ message: 'Condición añadida exitosamente.' });
  });
});


// -------------------------- ADMIN --------------------------

// ------------- crearNuevoUsuario -------------

app.post('/crearNuevoUsuario', (req, res) => {
  const { Nombre, Contraseña, Correo } = req.body;

  // Verificar que los datos requeridos estén presentes
  if (!Nombre || !Contraseña || !Correo) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  // Consulta SQL para insertar el nuevo usuario
  const query = `
      INSERT INTO Usuarios (Usuario, Contrasena, Correo, Tipo)
      VALUES (?, ?, ?, 'Usuario')
  `;

  // Ejecutar la consulta
  pool.query(query, [Nombre, Contraseña, Correo], (error, results) => {
      if (error) {
          // Manejo de errores (e.g., correo duplicado)
          if (error.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ mensaje: 'El correo ya está en uso' });
          }
          console.error('Error al crear el usuario:', error);
          return res.status(500).json({ mensaje: 'Error del servidor' });
      }

      // Usuario creado con éxito
      return res.status(201).json({ mensaje: 'Usuario creado con éxito', id: results.insertId });
  });
});

-// ----- obtener usuarios registrados ------

app.get('/ObtenerUsuariosNormales', (req, res) => {
  const query = 'SELECT ID as id, Usuario as Nombre FROM Usuarios WHERE Tipo != "Admin"';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los usuarios normales:', error);
      res.status(500).json({ error: 'Error al obtener los usuarios normales' });
    } else {
      res.json(results);
    }
  });
});

//--------------------- Administrar Actuadores usuario 1 -------------

//---- Obtener actuadores por usuario -----

app.get('/ActuadoresPorUsuario/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;

  const query = `
    SELECT a.id AS id, a.Nombre AS nombre
    FROM Actuador a
    JOIN Campos c ON a.Id_Campo = c.IdCampo
    JOIN Usuario_Campo uc ON c.IdCampo = uc.id_campo
    WHERE uc.id_usuario = ?;
  `;

  pool.query(query, [idUsuario], (error, results) => {
    if (error) {
      console.error('Error al obtener los actuadores del usuario:', error);
      res.status(500).json({ error: 'Error al obtener los actuadores del usuario' });
    } else {
      res.json(results);
    }
  });
});

//----- Añadir actuador por usuario ------

app.post('/AnadirActuadoraUsuario', (req, res) => {
  const { idUsuario, NombreActuador, ServerMQTT, Topico } = req.body;

  if (!idUsuario || !NombreActuador || !ServerMQTT || !Topico) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const queryObtenerCampo = `
    SELECT id_campo 
    FROM Usuario_Campo 
    WHERE id_usuario = ? 
    LIMIT 1;
  `;

  pool.query(queryObtenerCampo, [idUsuario], (error, results) => {
    if (error) {
      console.error('Error al obtener el campo del usuario:', error);
      return res.status(500).json({ error: 'Error al obtener el campo del usuario' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontró un campo asociado al usuario' });
    }

    const idCampo = results[0].id_campo;

    const queryInsertarActuador = `
      INSERT INTO Actuador (Nombre, IPMqtt, Topico, Id_Campo, Modo, Favorito, FavoritoMostrar, EstadoActual)
      VALUES (?, ?, ?, ?, 'Manual', 0, 'Ninguno', 'Desconocido');
    `;

    pool.query(queryInsertarActuador, [NombreActuador, ServerMQTT, Topico, idCampo], (error, result) => {
      if (error) {
        console.error('Error al insertar el actuador:', error);
        return res.status(500).json({ error: 'Error al insertar el actuador' });
      }

      res.status(201).json({
        message: 'Actuador añadido exitosamente',
        actuadorId: result.insertId,
      });
    });
  });
});


//------------------------ Modificar Actuador 1 --------------------

//------ Añadir accion ------

app.post('/AnadirAccionActuador', (req, res) => {
  const { idActuador, NombreAccion, MensajeTopico, Topico } = req.body;

  if (!idActuador || !NombreAccion || !MensajeTopico || !Topico) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Insertar la nueva acción en la tabla Accion
  const queryInsertarAccion = `
    INSERT INTO Accion (Nombre, Mensaje, Topico)
    VALUES (?, ?, ?);
  `;

  pool.query(queryInsertarAccion, [NombreAccion, MensajeTopico, Topico], (error, result) => {
    if (error) {
      console.error('Error al insertar la acción:', error);
      return res.status(500).json({ error: 'Error al insertar la acción' });
    }

    const idAccion = result.insertId;

    // Asociar la acción al actuador en la tabla AccionActuador
    const queryAsociarAccionActuador = `
      INSERT INTO AccionActuador (id_accion, id_actuador)
      VALUES (?, ?);
    `;

    pool.query(queryAsociarAccionActuador, [idAccion, idActuador], (error) => {
      if (error) {
        console.error('Error al asociar la acción con el actuador:', error);
        return res.status(500).json({ error: 'Error al asociar la acción con el actuador' });
      }

      res.status(201).json({
        message: 'Acción añadida y asociada al actuador exitosamente',
        accionId: idAccion,
      });
    });
  });
});

//------ Obtener Accion por id -------

app.get('/ObtenerdatosAccion/:id', (req, res) => {
  const { id } = req.params; // Obtener el id desde los parámetros de la URL

  // Consulta SQL para obtener los datos de la acción
  const query = `
    SELECT 
      Nombre AS Nombre, 
      Nombre AS NombreAccion, 
      Mensaje AS MensajeTopico, 
      Topico 
    FROM Accion 
    WHERE id_accion = ?;
  `;

  // Ejecutar la consulta
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la acción:', error);
      return res.status(500).json({ error: 'Error al obtener los datos de la acción' });
    }

    // Si no se encuentra la acción con el ID proporcionado
    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontró una acción con el ID especificado' });
    }

    // Devolver los datos en formato JSON
    res.json(results[0]);
  });
});

//------ Obtener Acciones por actuador ------

app.get('/ObtenerAccionesPorActuador/:IdActuador', (req, res) => {
  const { IdActuador } = req.params;

  const query = `
      SELECT a.id_accion AS id, a.Nombre
      FROM Accion a
      JOIN AccionActuador aa ON a.id_accion = aa.id_accion
      WHERE aa.id_actuador = ?
  `;

  pool.query(query, [IdActuador], (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al obtener las acciones' });
      }
      
      // Retornar las acciones en formato JSON
      res.json(results);
  });
});





// ------------- Print del puerto -------------
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto: " + port);
});

