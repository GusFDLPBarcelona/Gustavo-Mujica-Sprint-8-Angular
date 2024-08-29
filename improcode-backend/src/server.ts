import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Archivo JSON para la base de datos temporal
const DATA_FILE = "./productos.json";

// Obtener la lista
app.get("/productos", (req: Request, res: Response) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al leer el archivo de productos");
        }
        else {
            const productos = JSON.parse(data.toString());
            return res.json(productos)
        };
    });
});

// Agregar
app.post("/productos", (req: Request, res: Response) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(401).send("Error al leer el archivo de productos");
        }
        else {
            const productos = JSON.parse(data.toString());
            const nuevoProducto = req.body;
            nuevoProducto.id = productos.length + 1;
            productos.push(nuevoProducto);
            fs.writeFile(DATA_FILE, JSON.stringify(productos), (err) => {
                if (err) {
                    return res.status(401).send("Error al guardar el producto");
                }
                else {
                    return res.status(201).json(nuevoProducto);
                }
            });
            return res;
        }


    });
});

// Eliminar
app.delete("/productos/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params["id"]);
    if (isNaN(id)) {
        return res.status(400).send("ID inválido");
    }
    else {
        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                return res.status(500).send("Error al leer el archivo de productos");
            }
            else {
                let productos = JSON.parse(data.toString());
                const productosFiltrados = productos.filter((producto: { id: number }) => producto.id === id);
                if (productosFiltrados.length !== 1) {
                    return res.status(404).send("Producto no encontrado");
                } else {
                    const productosRestantes = productos.filter((producto: { id: number }) => producto.id !== id);
                    if (productosRestantes.length === (productos.length - 1)) {
                        fs.writeFile(DATA_FILE, JSON.stringify(productosRestantes), (err) => {
                            if (err) {
                                return res.status(500).send("Error al eliminar el producto");
                            } else {
                                return res.status(200).send("Producto eliminado");
                            }
                        });
                    }
                }
            }
            return res;
        })

    }
    return res;
});
// Revisar el inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});