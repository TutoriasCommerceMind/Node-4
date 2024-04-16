// Importar el modelo de producto

const Product = require("../models/productModel");

// Imporamos el modelo de Usuario

const User = require("../models/userModel")

// Funcion para obtener todos los productos.

function getAllProducts(req, res) {
  Product.find()
    .then((products) => res.json(products)) //Enviar la lista de productos de la base de datos en formato JSON
    .catch((err) => {
      // Capturamos cualquier error que pueda aparecer
      console.error(err);
      res.status(500).send("Error al obtener los productos");
    });
}

// Funcion para crear un nuevo producto.

function createProduct(req, res) {
  // Obtener los datos del producto y el ID del usuario que lo creó del cuerpo de la solicitud
  const { name, price, description, userId } = req.body;
  // Utilizar el método create() de Mongoose para crear un nuevo producto con los datos proporcionados
  Product.create({ name, price, description, createdBy: userId })
    .then((newProduct) => {
      // Agregar el ID del nuevo producto al array de productos del usuario
      User.findByIdAndUpdate(userId, { $push: { products: newProduct._id } })
        .then(() => res.json(newProduct)) // Enviar el nuevo producto creado como respuesta en formato JSON
        .catch((err) => {
          // Capturar cualquier error y enviar una respuesta de error
          console.error(err);
          res
            .status(500)
            .send("Error al actualizar el usuario con el nuevo producto");
        });
    })
    .catch((err) => {
      // Capturar cualquier error y enviar una respuesta de error
      console.error(err);
      res.status(500).send("Error al crear el producto");
    });
}

// Funcion para eliminar un producto Existente
function deleteProduct(req, res) {
  // Obtener el ID del producto que vamos a eliminar
  const productId = req.params.id;
  //Utilizamos el metodo findByIdAndDelete() de Mongoose para buscar y eliminar un producto por su ID
  Product.findByIdAndDelete(productId)
    .then(() => res.send("Producto eliminado correctamente")) // Enviar una confirmacion de que el producto se elimino correctamente
    .catch((err) => {
      //Capturamos cualquier posible tipo de error
      console.error(err);
      res.status(500).send("Error al eliminar el producto");
    });
}

// Funcion par aactualizar un producto existente!
function updateProduct(req, res) {
  // Obtenemos el id del Producto y los datos actualizados en el body de la REQ
  const productId = req.params.id;
  const updatedProduct = req.body;
  // Utilizamos el metodo findByIdAndUpdate() de Mongoose para buscar y actualizar el producto por su ID
  // El parametro {new:true} indica que queremos recibir el producto actualizado como resultado.
  Product.findByIdAndUpdate(productId, updatedProduct, { new: true })
    .then((product) => {
      //Corroboramos que exista el producto
      if (!product) {
        return res.status(404).send("Producto No encontrado");
      }
      res.json(product); // Enviamos el producto en formato JSON
    })
    .catch((err) => {
      // Capturamos cualquier posible error
      console.error(err);
      res.status(500).send("Error al actualizar el producto");
    });
}

// Exportamos los controladores para usarlo en las rutas
module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
