// Importar todos los modulos que vayamos a usar.
const express = require("express");
const fs = require("fs");

// Instanciamos Express

const app = express();
const PORT = 3010;

// Instaciamos el middleware para que se permita el analisis del JSON en las solicitudes

app.use(express.json());

// Ruta para obtener todos los Elementos.

app.get("/products", (req, res) => {
  // Leer la base de datos de nuestro JSON
  fs.readFile("data.json", "utf8", (err, data) => {
    // Primero creamos un if para Manejar los errores
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer el archivo JSON");
      return;
    }
    // Posteriormente guardamos la informacion del JSON parseada.

    const newData = JSON.parse(data);

    // Mostramos la informacion en nuestra consola.
    console.log("RESPUESTA GET: ", newData);

    // Le enviamos la informacion al cliente.
    res.json(newData);
  });
});

// Ruta para agregar un nuevo elemento

app.post("/products", (req, res) => {
  // Leer la base de datos de nuestro JSON
  fs.readFile("data.json", "utf8", (err, data) => {
    // Primero creamos un if para Manejar los errores
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer el archivo JSON");
      return;
    }

    // Posteriormente guardamos la informacion del JSON parseada.

    const newData = JSON.parse(data);

    // Agregar el nuevo elemento desde la solicitud.

    const newItem = req.body;

    // Pusheamos el nuevo elemento a nuestro JSON
    newData.push(newItem);

    // Creamos la funcion para podes agregar el nuevo elemento enviado por el cliente a nuestra base de datos
    fs.writeFile("data.json", JSON.stringify(newData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error el escribir el Archivo JSON");
        return;
      }
      console.log("Producto creado correctamente: ", newItem);
      res.json(newItem);
    });
  });
});

// Ruta para eliminar un producto

app.delete("/products/:id", (req, res) => {
  const itemId = req.params.id;
  // Leer la base de datos de nuestro JSON

  fs.readFile("data.json", "utf8", (err, data) => {
    // Primero creamos un if para Manejar los errores

    if (err) {
      console.error(err);
      res.status(500).send("Error al leer el archivo JSON");
      return;
    }

    // Posteriormente guardamos la informacion del JSON parseada.

    let newData = JSON.parse(data);

    // Filtrar el elemento a eliminar.

    newData = newData.filter((dat) => dat.id !== itemId);

    //Creamos la funcion para poder manipular la informacion del json asi poder elminarlo
    fs.writeFile("data.json", JSON.stringify(newData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al eliminar en el archivo json");
        return;
      }
      // Consologear la respuesta para el servidor

      console.log("RESPUESTA DELETE: ELEMENTO ELIMINADO CORRECTAMENTE");

      // Respuesta al cliente

      res.send("Elemento eliminado correctamente");
    });
  });
});

// Ruta para Actualizar un producto

app.put("/products/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedProduct = req.body;

  // Leer la base de datos de nuestro JSON

  fs.readFile("data.json", "utf8", (err, data) => {
    // Primero creamos un if para Manejar los errores

    if (err) {
      console.error(err);
      res.status(500).send("Error al leer el archivo JSON");
      return;
    }

    // Posteriormente guardamos la informacion del JSON parseada.

    let newData = JSON.parse(data);

    // Encontrar el indice del elemento a Actualizar

    const index = newData.findIndex((dat) => dat.id === itemId);

    // Manejo de error en caso que no exista el elemento.

    if (index === -1) {
      res.status(404).send("Elemento no encontrado");
      return;
    }

    // Actualizar el elemento.

    newData[index] = { ...newData[index], ...updatedProduct };

    // Escribir los datos actualizados en el JSON.

    fs.writeFile("data.json", JSON.stringify(newData), (err) => {
        //Manejo de errores
      if (err) {
        console.error(err);
        res.status(500).send("Error al escribir en el archivo JSON");
        return;
      }
      // Respuesta al servidor
      console.log("Respuesta del PUT: ", newData[index]);
      // Respuesta al cliente
      res.json(newData[index]);
    });
  });
});

// Inicializamos el Servidor

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});