import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Producto = db.define('Producto', {

    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    talla: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.STRING
    },
}, {

    createdAt: true,
    updatedAt: true,

});

export default Producto;