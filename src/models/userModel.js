const mongoose = require("mongoose");

// Definimos el esquema

const userSchema = new mongoose.Schema({
  username: String, // Campo para almacenar el Username del usuario
  email: String, // Campo para almacenar el Email del usuario
  products: [ // Campo para almacenars los IDs de los productos asociados la usuario.
    {
      type: mongoose.Schema.Types.ObjectId, // Tipo de dato que va a admitir == Id del objeto de MongoDB
      ref: "Product" // Referencia al modelo de la base de datos.
    },
  ],
});

// Creamos el modelo de usuario utilizando el esquema definido arriba.

const User = mongoose.model("User", userSchema);

// Exporamos el modelo de usuario para que lo utilizemos en otras partes
module.exports = User;
