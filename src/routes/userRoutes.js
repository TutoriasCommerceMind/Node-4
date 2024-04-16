// Importaos expresss para crear las Rutas

const express = require("express");

// Importamos el controlador de Usuarios.

const userController = require("../controllers/userController");

// Creamos el Router.

const router = express.Router();

router.get("/", userController.getAllUsers); // Ruta para obtener todos los usuarios.
router.post("/", userController.createUser); // Ruta para crear un usuario.
router.delete("/:id", userController.deleteUser); // Ruta para eliminar un usuario.
router.put("/:id", userController.updatedUser); // Ruta para actualizar un usuario.

// Exportamos el router para que se pueda utilizar en el app.

module.exports = router;
