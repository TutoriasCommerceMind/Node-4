// Importamos Express para crear las rutas.
const express = require("express");

// Importando los controladores de productos.
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// Crear un objeto Router para definir los productos
const router = express.Router();

router.get("/", getAllProducts); // Ruta para obtener todos los productos.
router.post("/", createProduct); // Ruta para crear un producto.
router.delete("/:id", deleteProduct); // Ruta para eliminar un producto.
router.put("/:id", updateProduct); // Ruta para actualizar un producto

// Exportamos el Router para usarlo en el app
module.exports = router;
