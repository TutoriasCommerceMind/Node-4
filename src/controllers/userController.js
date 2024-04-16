// Importamos el modelo de Mongo

const User = require("../models/userModel");

// Funcion para obtener todos los usuarios

function getAllUsers(req, res) {
  // Utilizamos el metodo Find() de Mongoose para encontrar todos los usuarios.
  User.find()
    // Realizamos la operacion de "populate" en el campo "products" para obtener los detalles de los productos asociados
    .populate("products")
    .then(users => res.json(users)) // Enviamos la lista de usuarios en formato JSON
    .catch((err) => {
      //Capturamos cualquier posible tipo de error
      console.error(err);
      res.status(500).send("Error al obtener usuarios");
    });
}

// Funcion para crear un nuevo usuario.

function createUser(req, res) {
  // Obtenemos el nombre de usuario y el correo  cuerpo de la solicitud.
  const { username, email } = req.body;

  // Utilizamos el metodo create() de mongoose para crear un nuevo usuario con los datos proporcionados.

  User.create({ username, email }) // Le pasamos como paramero los datos que vinieron del body
    .then((newUser) => res.json(newUser)) // Enviamos el nuevo usuario en formato JSON
    .catch((err) => {
      //Capturamos cualquier posible tipo de error
      console.error(err);
      res.status(500).send("Error al crear usuario");
    });
}

// Funcion para actualizar un usuario Existente.

function updatedUser(req, res) {
  // Obtenemos el Id del usuario a actualizar.
  const userId = req.params.id;
  // Obtenemos los datos actualizados del cuerpo de la solicitud
  const updatedUser = req.body;

  //Utilizamos el meotdo findByIdAndUpdate() de mongoose para buscar y actualizar el usuario por ID
  User.findByIdAndUpdate(userId, updatedUser, { new: true }) // El primer campo hace referencia a que usuario actualiza, el segundo los nuevos datos, y el tercero que lo cree como nuevo.
    .then((user) => res.json(user)) // Enviamos el usuario actualizado como respuesta en formato JSON.
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error al actualizar el usuario");
    });
}

// Funcion para eliminar un usuario existente

function deleteUser(req, res) {
  // Obtenemos el Id del usuario a actualizar.
  const userId = req.params.id;

  //Utilizamos el meotdo findByIdAndDelete() de mongoose para buscar y eliminar el usuario por ID

  User.findByIdAndDelete(userId) // Se le pasa como parametro el id a eliminar.
  .then(() => res.send("Usuario eliminado correctamente")) // Enviamos una confirmacion de que el usuario se elimino correctamente.
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error al eliminar el usuario");
  });
}

module.exports={
    createUser,
    deleteUser,
    getAllUsers,
    updatedUser
}