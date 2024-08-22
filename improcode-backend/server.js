
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Archivo JSON para la base de datos temporal
const DATA_FILE = "./productos.json";

// Obtener la lista
app.get("/productos", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
      if (err) {
        console.log(err);
      return res.status(500).send("Error al leer el archivo de productos");
    }
    const productos = JSON.parse(data);
    res.json(productos);
  });
});

// Agregar
app.post("/productos", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo de productos");
    }
    const productos = JSON.parse(data);
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);

    fs.writeFile(DATA_FILE, JSON.stringify(productos), (err) => {
      if (err) {
        return res.status(500).send("Error al guardar el producto");
      }
      res.status(201).json(nuevoProducto);
    });
  });
});

// Eliminar
app.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo de productos");
    }
    let productos = JSON.parse(data);
    productos = productos.filter((producto) => producto.id !== id);

    fs.writeFile(DATA_FILE, JSON.stringify(productos), (err) => {
      if (err) {
        return res.status(500).send("Error al eliminar el producto");
      }
      res.status(200).send("Producto eliminado");
    });
  });
});

// reviser el inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

