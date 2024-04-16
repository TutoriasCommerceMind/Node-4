const express = require("express");
const connectDB= require("./db/db")
const productRoutes = require("./routes/productRoutes"); //Importamos las rutas de Productos.
const userRoutes= require("./routes/userRoutes")

const app = express(); // Creamos una nueva instancia de la aplicacion Express
const PORT = 3000; // Definimos el puerto en donde se ejecuta el server

app.use(express.json()); //Permitimos a la aplicacion Express analizar los JSON.

connectDB()

app.use("/products", productRoutes); //Asociamos todas las rutas del producto con la ruta base "/products"
app.use("/users", userRoutes) // Asociamos todas las rutas de User con la ruta base "/users"

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});
